import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import CommentSection from '../components/post/comment-section.jsx';
import LikeButton from '../components/post/like-button.jsx';
import ConfirmDialog from '../components/ui/confirm-dialog.jsx';
import PageLoader from '../components/ui/page-loader.jsx';
import { useAuth } from '../hooks/use-auth.js';
import { deletePost, fetchPost, increaseViewCount } from '../utils/community-api.js';
import { formatDateTime } from '../utils/format-date.js';
import { CATEGORY_COLORS } from '../utils/site-config.js';

/**
 * PostDetailPage 컴포넌트 - 게시물 상세 (올린시간, 올린사람, 수정시간, 좋아요, 댓글)
 *
 * Props: 없음 (URL 의 postId 사용)
 *
 * Example usage:
 * <Route path="/posts/:postId" element={ <PostDetailPage /> } />
 */
function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const viewedPostRef = useRef(null);

  useEffect(() => {
    let isActive = true;

    async function loadPost() {
      setIsLoading(true);
      if (viewedPostRef.current !== postId) {
        viewedPostRef.current = postId;
        await increaseViewCount(postId);
      }
      const { data, error } = await fetchPost(postId);
      if (!isActive) return;
      if (error || !data) setErrorMessage('게시물을 찾을 수 없어요.');
      else setPost(data);
      setIsLoading(false);
    }

    loadPost();
    return () => {
      isActive = false;
    };
  }, [postId]);

  const handleDelete = async () => {
    setIsDeleting(true);
    const { error } = await deletePost(post);
    if (error) {
      setIsDeleting(false);
      setIsDeleteOpen(false);
      setErrorMessage('게시물을 삭제하지 못했어요.');
      return;
    }
    navigate('/', { replace: true });
  };

  if (isLoading) return <PageLoader />;
  if (!post) {
    return (
      <Box sx={ { textAlign: 'center' } }>
        <Alert severity="warning" sx={ { mb: 2 } }>{ errorMessage }</Alert>
        <Button component={ RouterLink } to="/" startIcon={ <ArrowBackIcon /> }>목록으로</Button>
      </Box>
    );
  }

  const isOwner = profile?.id === post.user_id;
  const isEdited = post.updated_at !== post.created_at;

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', gap: 3 } }>
      <Box>
        <Button component={ RouterLink } to="/" startIcon={ <ArrowBackIcon /> } color="inherit">
          목록으로
        </Button>
      </Box>

      { errorMessage && <Alert severity="error">{ errorMessage }</Alert> }

      <Paper sx={ { p: { xs: 2.5, md: 4 } } }>
        <Chip
          label={ post.category }
          size="small"
          sx={ { bgcolor: CATEGORY_COLORS[post.category] ?? 'primary.light', mb: 1.5 } }
        />
        <Typography variant="h4" component="h1" sx={ { fontSize: { xs: '1.6rem', md: '2.2rem' }, wordBreak: 'break-word' } }>
          { post.title }
        </Typography>

        <Box sx={ { display: 'flex', alignItems: 'center', gap: 1.5, mt: 2, flexWrap: 'wrap' } }>
          <Avatar sx={ { bgcolor: 'primary.main', width: 40, height: 40 } }>
            { post.author?.name?.charAt(0) ?? '?' }
          </Avatar>
          <Box sx={ { flex: 1, minWidth: 0 } }>
            <Box sx={ { fontWeight: 700 } }>{ post.author?.name ?? '알 수 없음' }</Box>
            <Box sx={ { fontSize: '0.8rem', color: 'text.secondary', display: 'flex', columnGap: 1.5, flexWrap: 'wrap' } }>
              <span>올린 시간 { formatDateTime(post.created_at) }</span>
              { isEdited && <span>수정 시간 { formatDateTime(post.updated_at) }</span> }
              <span>조회 { post.view_count }</span>
            </Box>
          </Box>
        </Box>

        <Divider sx={ { my: 3 } } />

        { post.rating && (
          <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, mb: 2 } }>
            <Box component="span" sx={ { fontSize: '0.9rem', color: 'text.secondary' } }>별점</Box>
            <Rating value={ post.rating } readOnly />
          </Box>
        ) }

        { post.image_url && (
          <Box
            component="img"
            src={ post.image_url }
            alt={ post.title }
            sx={ { width: '100%', maxHeight: 480, objectFit: 'contain', borderRadius: 4, bgcolor: 'background.default', mb: 3 } }
          />
        ) }

        <Typography sx={ { whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: { xs: '1rem', md: '1.05rem' } } }>
          { post.content }
        </Typography>

        <Box sx={ { display: 'flex', justifyContent: 'center', mt: 5 } }>
          <LikeButton postId={ post.id } />
        </Box>

        { isOwner && (
          <Box sx={ { display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 } }>
            <Button
              component={ RouterLink }
              to={ `/posts/${post.id}/edit` }
              variant="outlined"
              color="secondary"
              startIcon={ <EditOutlinedIcon /> }
            >
              수정
            </Button>
            <Button variant="outlined" color="error" startIcon={ <DeleteOutlineIcon /> } onClick={ () => setIsDeleteOpen(true) }>
              삭제
            </Button>
          </Box>
        ) }
      </Paper>

      <CommentSection postId={ post.id } />

      <ConfirmDialog
        isOpen={ isDeleteOpen }
        title="게시물 삭제"
        message="이 게시물을 삭제할까요? 댓글과 좋아요도 함께 삭제돼요."
        isLoading={ isDeleting }
        onConfirm={ handleDelete }
        onClose={ () => setIsDeleteOpen(false) }
      />
    </Box>
  );
}

export default PostDetailPage;
