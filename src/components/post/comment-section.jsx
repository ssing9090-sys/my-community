import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';

import ConfirmDialog from '../ui/confirm-dialog.jsx';
import { useAuth } from '../../hooks/use-auth.js';
import { createComment, deleteComment, fetchComments } from '../../utils/community-api.js';
import { formatRelativeTime } from '../../utils/format-date.js';

/**
 * CommentSection 컴포넌트 - 댓글 목록, 작성, 삭제
 *
 * Props:
 * @param {string|number} postId - 게시물 번호 [Required]
 *
 * Example usage:
 * <CommentSection postId={ post.id } />
 */
function CommentSection({ postId }) {
  const location = useLocation();
  const { profile } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;
    fetchComments(postId).then(({ data, error }) => {
      if (!isActive) return;
      if (error) setErrorMessage('댓글을 불러오지 못했어요.');
      else setComments(data);
    });
    return () => {
      isActive = false;
    };
  }, [postId, reloadKey]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    const { error } = await createComment({ post_id: Number(postId), user_id: profile.id, content: content.trim() });
    setIsSubmitting(false);
    if (error) {
      setErrorMessage('댓글을 등록하지 못했어요.');
      return;
    }
    setErrorMessage('');
    setContent('');
    setReloadKey((key) => key + 1);
  };

  const handleDelete = async () => {
    const { error } = await deleteComment(deleteTargetId);
    setDeleteTargetId(null);
    if (error) setErrorMessage('댓글을 삭제하지 못했어요.');
    else setReloadKey((key) => key + 1);
  };

  return (
    <Paper sx={ { p: { xs: 2.5, md: 4 } } }>
      <Typography variant="h6" component="h2" sx={ { mb: 2 } }>
        💬 댓글 { comments.length }
      </Typography>

      { errorMessage && <Alert severity="error" sx={ { mb: 2 } }>{ errorMessage }</Alert> }

      <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 } }>
        { comments.length === 0 && (
          <Typography color="text.secondary" sx={ { py: 2, textAlign: 'center' } }>
            첫 댓글을 남겨 보세요 🌸
          </Typography>
        ) }
        { comments.map((comment) => (
          <Box
            key={ comment.id }
            sx={ { display: 'flex', gap: 1.5, p: 1.5, borderRadius: 3, bgcolor: 'background.default' } }
          >
            <Avatar sx={ { width: 32, height: 32, bgcolor: 'secondary.main', fontSize: '0.9rem' } }>
              { comment.author?.name?.charAt(0) ?? '?' }
            </Avatar>
            <Box sx={ { flex: 1, minWidth: 0 } }>
              <Box sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
                <Box component="span" sx={ { fontWeight: 700, fontSize: '0.9rem' } }>{ comment.author?.name ?? '알 수 없음' }</Box>
                <Box component="span" sx={ { color: 'text.secondary', fontSize: '0.75rem' } }>
                  { formatRelativeTime(comment.created_at) }
                </Box>
              </Box>
              <Typography variant="body2" sx={ { whiteSpace: 'pre-wrap', wordBreak: 'break-word', mt: 0.5 } }>
                { comment.content }
              </Typography>
            </Box>
            { profile?.id === comment.user_id && (
              <IconButton aria-label="댓글 삭제" size="small" onClick={ () => setDeleteTargetId(comment.id) } sx={ { alignSelf: 'flex-start' } }>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            ) }
          </Box>
        )) }
      </Box>

      { profile ? (
        <Box component="form" onSubmit={ handleSubmit } sx={ { display: 'flex', flexDirection: 'column', gap: 1 } }>
          <TextField
            value={ content }
            onChange={ (event) => setContent(event.target.value) }
            placeholder="따뜻한 댓글을 남겨 주세요"
            multiline
            minRows={ 2 }
            fullWidth
            slotProps={ { htmlInput: { maxLength: 1000 } } }
          />
          <Box sx={ { display: 'flex', justifyContent: 'flex-end' } }>
            <Button type="submit" variant="contained" disabled={ isSubmitting || !content.trim() }>
              댓글 등록
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={ { textAlign: 'center', py: 2, borderRadius: 3, bgcolor: 'primary.light' } }>
          <Typography variant="body2" sx={ { mb: 1 } }>로그인하고 댓글을 남겨 보세요</Typography>
          <Button component={ RouterLink } to="/login" state={ { from: location.pathname } } variant="contained" size="small">
            로그인
          </Button>
        </Box>
      ) }

      <ConfirmDialog
        isOpen={ deleteTargetId !== null }
        title="댓글 삭제"
        message="이 댓글을 삭제할까요?"
        onConfirm={ handleDelete }
        onClose={ () => setDeleteTargetId(null) }
      />
    </Paper>
  );
}

export default CommentSection;
