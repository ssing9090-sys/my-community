import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useAuth } from '../../hooks/use-auth.js';
import { fetchLikeState, likePost, unlikePost } from '../../utils/community-api.js';

/**
 * LikeButton 컴포넌트 - 게시물 좋아요 토글 버튼 (좋아요 수 표시)
 *
 * Props:
 * @param {string|number} postId - 게시물 번호 [Required]
 *
 * Example usage:
 * <LikeButton postId={ post.id } />
 */
function LikeButton({ postId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const profileId = profile?.id ?? null;

  useEffect(() => {
    let isActive = true;
    fetchLikeState(postId, profileId).then((state) => {
      if (!isActive) return;
      setLikeCount(state.count);
      setIsLiked(state.isLiked);
    });
    return () => {
      isActive = false;
    };
  }, [postId, profileId]);

  const handleToggle = async () => {
    if (!profileId) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    setIsPending(true);
    const { error } = isLiked ? await unlikePost(postId, profileId) : await likePost(postId, profileId);
    if (!error) {
      setLikeCount((count) => count + (isLiked ? -1 : 1));
      setIsLiked(!isLiked);
    }
    setIsPending(false);
  };

  return (
    <Button
      variant={ isLiked ? 'contained' : 'outlined' }
      color="primary"
      size="large"
      onClick={ handleToggle }
      disabled={ isPending }
      startIcon={ isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
      sx={ { px: 3 } }
    >
      좋아요 { likeCount }
    </Button>
  );
}

export default LikeButton;
