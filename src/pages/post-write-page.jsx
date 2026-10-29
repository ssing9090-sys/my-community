import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import PostForm from '../components/post/post-form.jsx';
import { useAuth } from '../hooks/use-auth.js';
import { createPost, uploadPostImage } from '../utils/community-api.js';

/**
 * PostWritePage 컴포넌트 - 새 게시물 등록 (로그인 필요)
 *
 * Props: 없음
 *
 * Example usage:
 * <Route path="/posts/new" element={ <RequireAuth><PostWritePage /></RequireAuth> } />
 */
function PostWritePage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const imageUrl = values.imageFile ? await uploadPostImage(values.imageFile, user.id) : null;
      const { data, error } = await createPost({
        title: values.title,
        content: values.content,
        category: values.category,
        rating: values.rating,
        image_url: imageUrl,
        user_id: profile.id,
      });
      if (error) throw error;
      navigate(`/posts/${data.id}`, { replace: true });
    } catch {
      setErrorMessage('게시물을 등록하지 못했어요. 잠시 후 다시 시도해 주세요.');
      setIsSubmitting(false);
    }
  };

  return (
    <Paper sx={ { p: { xs: 2.5, md: 4 } } }>
      <Typography variant="h5" component="h1" sx={ { mb: 3, color: 'primary.dark' } }>
        ✏️ 새 글 쓰기
      </Typography>
      { errorMessage && <Alert severity="error" sx={ { mb: 2 } }>{ errorMessage }</Alert> }
      <PostForm submitLabel="등록하기" isSubmitting={ isSubmitting } onSubmit={ handleSubmit } onCancel={ () => navigate(-1) } />
    </Paper>
  );
}

export default PostWritePage;
