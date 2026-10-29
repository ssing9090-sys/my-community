import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import { formatRelativeTime } from '../../utils/format-date.js';
import { CATEGORY_COLORS } from '../../utils/site-config.js';

const metaItemSx = { display: 'inline-flex', alignItems: 'center', gap: 0.5 };

/**
 * PostListItem 컴포넌트 - 게시물 목록의 한 줄 (등록시간, 조회수, 수정/삭제)
 *
 * Props:
 * @param {object} post - 게시물 데이터 (author, comments, post_likes 집계 포함) [Required]
 * @param {boolean} isOwner - 내가 쓴 글인지 여부 [Optional, 기본값: false]
 * @param {function} onDelete - 삭제 버튼 클릭 시 실행 [Optional]
 *
 * Example usage:
 * <PostListItem post={ post } isOwner onDelete={ () => setDeleteTarget(post) } />
 */
function PostListItem({ post, isOwner = false, onDelete }) {
  const commentCount = post.comments?.[0]?.count ?? 0;
  const likeCount = post.post_likes?.[0]?.count ?? 0;

  return (
    <Paper
      variant="outlined"
      sx={ {
        p: { xs: 2, md: 2.5 },
        borderColor: 'divider',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 6px 18px rgba(244, 143, 177, 0.2)',
          transform: 'translateY(-2px)',
        },
      } }
    >
      <Box sx={ { display: 'flex', gap: 2, alignItems: 'center' } }>
        <Box
          component={ RouterLink }
          to={ `/posts/${post.id}` }
          sx={ { flex: 1, minWidth: 0, textDecoration: 'none', color: 'inherit' } }
        >
          <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' } }>
            <Chip
              label={ post.category }
              size="small"
              sx={ { bgcolor: CATEGORY_COLORS[post.category] ?? 'primary.light', color: 'text.primary' } }
            />
            { post.rating && <Rating value={ post.rating } readOnly size="small" /> }
          </Box>
          <Box sx={ { display: 'flex', alignItems: 'baseline', gap: 0.75, minWidth: 0 } }>
            <Typography
              component="h3"
              sx={ { fontWeight: 700, fontSize: { xs: '1rem', md: '1.1rem' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }
            >
              { post.title }
            </Typography>
            { commentCount > 0 && (
              <Box component="span" sx={ { color: 'primary.dark', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 } }>
                [{ commentCount }]
              </Box>
            ) }
          </Box>
          <Box
            sx={ {
              display: 'flex',
              flexWrap: 'wrap',
              columnGap: 1.5,
              rowGap: 0.5,
              mt: 1,
              color: 'text.secondary',
              fontSize: '0.8rem',
              '& svg': { fontSize: '1rem' },
            } }
          >
            <Box component="span" sx={ metaItemSx }><PersonOutlineIcon />{ post.author?.name ?? '알 수 없음' }</Box>
            <Box component="span" sx={ metaItemSx }><AccessTimeIcon />{ formatRelativeTime(post.created_at) }</Box>
            <Box component="span" sx={ metaItemSx }><VisibilityOutlinedIcon />조회 { post.view_count }</Box>
            <Box component="span" sx={ { ...metaItemSx, color: 'primary.main' } }><FavoriteIcon />{ likeCount }</Box>
          </Box>
        </Box>
        { post.image_url && (
          <Box
            component="img"
            src={ post.image_url }
            alt=""
            loading="lazy"
            sx={ { width: { xs: 64, md: 80 }, height: { xs: 64, md: 80 }, objectFit: 'cover', borderRadius: 3, flexShrink: 0 } }
          />
        ) }
      </Box>
      { isOwner && (
        <Box sx={ { display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1.5 } }>
          <Button
            component={ RouterLink }
            to={ `/posts/${post.id}/edit` }
            size="small"
            color="secondary"
            startIcon={ <EditOutlinedIcon /> }
          >
            수정
          </Button>
          <Button size="small" color="error" startIcon={ <DeleteOutlineIcon /> } onClick={ onDelete }>
            삭제
          </Button>
        </Box>
      ) }
    </Paper>
  );
}

export default PostListItem;
