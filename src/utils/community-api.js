import { supabase } from '../lib/supabase.js';
import { PAGE_SIZE } from './site-config.js';

const IMAGE_BUCKET = 'post-images';

/* ===== 게시물 ===== */

/**
 * 게시물 목록 조회 (작성자 이름, 댓글 수, 좋아요 수 포함)
 * @param {{ page: number, category: string, keyword: string }} options
 */
export function fetchPosts({ page = 1, category = '', keyword = '' }) {
  const from = (page - 1) * PAGE_SIZE;
  let query = supabase
    .from('posts')
    .select(
      'id, title, category, rating, image_url, view_count, created_at, updated_at, user_id, author:users!posts_user_id_fkey(name), comments(count), post_likes(count)',
      { count: 'exact' },
    )
    .order('created_at', { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (category) query = query.eq('category', category);
  if (keyword) query = query.ilike('title', `%${keyword}%`);
  return query;
}

/** 게시물 1건 조회 */
export function fetchPost(postId) {
  return supabase
    .from('posts')
    .select('*, author:users!posts_user_id_fkey(name)')
    .eq('id', postId)
    .maybeSingle();
}

/** 조회수 1 증가 */
export function increaseViewCount(postId) {
  return supabase.rpc('increment_view_count', { p_post_id: Number(postId) });
}

/** 게시물 등록 후 새 게시물 id 반환 */
export function createPost(values) {
  return supabase.from('posts').insert(values).select('id').single();
}

/** 게시물 수정 */
export function updatePost(postId, values) {
  return supabase.from('posts').update(values).eq('id', postId);
}

/** 게시물 삭제 (첨부 사진도 함께 삭제) */
export async function deletePost(post) {
  const result = await supabase.from('posts').delete().eq('id', post.id);
  if (!result.error && post.image_url) await removePostImage(post.image_url);
  return result;
}

/* ===== 사진 ===== */

/**
 * 사진 업로드 후 공개 URL 반환 (실패 시 throw)
 * @param {File} file - 업로드할 이미지
 * @param {string} authId - 로그인 사용자 auth id (폴더명)
 */
export async function uploadPostImage(file, authId) {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${authId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, {
    contentType: file.type,
  });
  if (error) throw error;

  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

/** 공개 URL 로 저장된 사진 삭제 */
export function removePostImage(imageUrl) {
  const path = imageUrl.split(`/${IMAGE_BUCKET}/`)[1];
  if (!path) return Promise.resolve();
  return supabase.storage.from(IMAGE_BUCKET).remove([decodeURIComponent(path)]);
}

/* ===== 댓글 ===== */

export function fetchComments(postId) {
  return supabase
    .from('comments')
    .select('id, content, created_at, user_id, author:users(name)')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
}

export function createComment(values) {
  return supabase.from('comments').insert(values);
}

export function deleteComment(commentId) {
  return supabase.from('comments').delete().eq('id', commentId);
}

/* ===== 좋아요 ===== */

/**
 * 좋아요 수와 내가 좋아요를 눌렀는지 여부 조회
 * @param {string|number} postId
 * @param {number|null} userId - users.id (비로그인 시 null)
 */
export async function fetchLikeState(postId, userId) {
  const [{ count }, mine] = await Promise.all([
    supabase.from('post_likes').select('post_id', { count: 'exact', head: true }).eq('post_id', postId),
    userId
      ? supabase.from('post_likes').select('post_id').eq('post_id', postId).eq('user_id', userId).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);
  return { count: count ?? 0, isLiked: Boolean(mine.data) };
}

export function likePost(postId, userId) {
  return supabase.from('post_likes').insert({ post_id: Number(postId), user_id: userId });
}

export function unlikePost(postId, userId) {
  return supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', userId);
}

/* ===== 문의사항 ===== */

export function createInquiry(values) {
  return supabase.from('inquiries').insert(values);
}

export function fetchMyInquiries(userId) {
  return supabase
    .from('inquiries')
    .select('id, title, content, status, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}
