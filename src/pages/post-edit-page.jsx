import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import PostForm from '../components/post/post-form.jsx';
import PageLoader from '../components/ui/page-loader.jsx';
import { useAuth } from '../hooks/use-auth.js';
import { fetchPost, removePostImage, updatePost, uploadPostImage } from '../utils/community-api.js';

/**
 * PostEditPage 컴포넌트 - 내가 쓴 게시물 수정 (로그인 필요)
 *
 * Props: 없음 (URL 의 postId 사용)
 *
 * Example usage:
 * <Route path="/posts/:postId/edit" element={ <RequireAuth><PostEditPage /></RequireAuth> } />
 */
function PostEditPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isActive = true;
    fetchPost(postId).then(({ data, error }) => {
      if (!isActive) return;
      if (error || !data) setErrorMessage('게시물을 찾을 수 없어요.');
      else setPost(data);
      setIsLoading(false);
    });
    return () => {
      isActive = false;
    };
  }, [postId]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const nextImageUrl = values.imageFile ? await uploadPostImage(values.imageFile, user.id) : values.imageUrl;
      const { error } = await updatePost(post.id, {
        title: values.title,
        content: values.content,
        category: values.category,
        rating: values.rating,
        image_url: nextImageUrl,
      });
      if (error) throw error;
      if (post.image_url && post.image_url !== nextImageUrl) await removePostImage(post.image_url);
      navigate(`/posts/${post.id}`, { replace: true });
    } catch {
      setErrorMessage('게시물을 수정하지 못했어요. 잠시 후 다시 시도해 주세요.');
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <PageLoader />;
  if (!post) return <Alert severity="warning">{ errorMessage }</Alert>;
  if (post.user_id !== profile.id) return <Alert severity="warning">내가 쓴 게시물만 수정할 수 있어요.</Alert>;

  return (
    <Paper sx={ { p: { xs: 2.5, md: 4 } } }>
      <Typography variant="h5" component="h1" sx={ { mb: 3, color: 'primary.dark' } }>
        📝 게시물 수정
      </Typography>
      { errorMessage && <Alert severity="error" sx={ { mb: 2 } }>{ errorMessage }</Alert> }
      <PostForm
        key={ post.id }
        initialValues={ {
          title: post.title,
          category: post.category,
          rating: post.rating,
          content: post.content,
          imageUrl: post.image_url,
        } }
        submitLabel="수정하기"
        isSubmitting={ isSubmitting }
        onSubmit={ handleSubmit }
        onCancel={ () => navigate(-1) }
      />
    </Paper>
  );
}

export default PostEditPage;
