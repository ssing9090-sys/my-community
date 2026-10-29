import { useEffect, useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

import PostListItem from '../components/post/post-list-item.jsx';
import ConfirmDialog from '../components/ui/confirm-dialog.jsx';
import PageLoader from '../components/ui/page-loader.jsx';
import { useAuth } from '../hooks/use-auth.js';
import { deletePost, fetchPosts } from '../utils/community-api.js';
import { PAGE_SIZE, POST_CATEGORIES } from '../utils/site-config.js';

/**
 * PostListPage 컴포넌트 - 게시물 목록 (카테고리, 검색, 페이지네이션)
 *
 * Props: 없음
 *
 * Example usage:
 * <Route path="/" element={ <PostListPage /> } />
 */
function PostListPage() {
  const { profile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') ?? '';
  const keyword = searchParams.get('q') ?? '';

  const [searchInput, setSearchInput] = useState(keyword);
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loadedKey, setLoadedKey] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  /** 현재 조건으로 불러온 결과가 아직 없으면 로딩 중 */
  const requestKey = `${page}|${category}|${keyword}|${reloadKey}`;
  const isLoading = loadedKey !== requestKey;

  useEffect(() => {
    let isActive = true;
    fetchPosts({ page, category, keyword }).then(({ data, count, error }) => {
      if (!isActive) return;
      if (error) {
        setErrorMessage('게시물을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.');
      } else {
        setPosts(data);
        setTotalCount(count ?? 0);
        setErrorMessage('');
      }
      setLoadedKey(requestKey);
    });
    return () => {
      isActive = false;
    };
  }, [page, category, keyword, requestKey]);

  const updateParams = (next) => {
    const merged = { page: 1, category, q: keyword, ...next };
    const params = {};
    if (merged.page > 1) params.page = String(merged.page);
    if (merged.category) params.category = merged.category;
    if (merged.q) params.q = merged.q;
    setSearchParams(params);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    updateParams({ q: searchInput.trim() });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const { error } = await deletePost(deleteTarget);
    setIsDeleting(false);
    setDeleteTarget(null);
    if (error) setErrorMessage('게시물을 삭제하지 못했어요.');
    else setReloadKey((key) => key + 1);
  };

  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', gap: 3 } }>
      <Box
        sx={ (theme) => ({
          p: { xs: 3, md: 5 },
          borderRadius: 6,
          textAlign: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 60%, ${theme.palette.success.light} 100%)`,
        }) }
      >
        <Typography variant="h3" component="h1" sx={ { fontSize: { xs: '1.8rem', md: '2.6rem' }, color: 'primary.dark', mb: 1 } }>
          나한테 맞는 화장법 찾기 💄
        </Typography>
        <Typography color="text.secondary" sx={ { fontSize: { xs: '0.95rem', md: '1.1rem' } } }>
          피부 타입, 퍼스널 컬러, 꿀팁까지! 함께 나누는 우리들의 화장대
        </Typography>
      </Box>

      <Box sx={ { display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: { md: 'center' } } }>
        <Box component="form" onSubmit={ handleSearch } sx={ { flex: 1 } }>
          <TextField
            value={ searchInput }
            onChange={ (event) => setSearchInput(event.target.value) }
            placeholder="제목으로 검색"
            size="small"
            fullWidth
            sx={ { '& .MuiOutlinedInput-root': { borderRadius: 999, bgcolor: 'background.paper' } } }
            slotProps={ {
              input: {
                startAdornment: (
                  <InputAdornment position="start"><SearchIcon color="primary" /></InputAdornment>
                ),
              },
            } }
          />
        </Box>
        <Button component={ RouterLink } to="/posts/new" variant="contained" startIcon={ <EditIcon /> }>
          글쓰기
        </Button>
      </Box>

      <Box sx={ { display: 'flex', gap: 1, flexWrap: 'wrap' } }>
        { ['', ...POST_CATEGORIES].map((item) => (
          <Chip
            key={ item || 'all' }
            label={ item || '전체' }
            clickable
            color={ category === item ? 'primary' : 'default' }
            variant={ category === item ? 'filled' : 'outlined' }
            onClick={ () => updateParams({ category: item }) }
            sx={ { bgcolor: category === item ? undefined : 'background.paper' } }
          />
        )) }
      </Box>

      { errorMessage && <Alert severity="error">{ errorMessage }</Alert> }

      { isLoading ? (
        <PageLoader />
      ) : posts.length === 0 ? (
        <Box sx={ { py: 8, textAlign: 'center', color: 'text.secondary' } }>
          <Box sx={ { fontSize: '3rem', mb: 1 } }>🎀</Box>
          <Typography>{ keyword || category ? '조건에 맞는 게시물이 없어요.' : '아직 게시물이 없어요. 첫 글을 남겨 주세요!' }</Typography>
        </Box>
      ) : (
        <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1.5 } }>
          { posts.map((post) => (
            <PostListItem
              key={ post.id }
              post={ post }
              isOwner={ profile?.id === post.user_id }
              onDelete={ () => setDeleteTarget(post) }
            />
          )) }
        </Box>
      ) }

      { pageCount > 1 && (
        <Box sx={ { display: 'flex', justifyContent: 'center' } }>
          <Pagination
            count={ pageCount }
            page={ page }
            color="primary"
            onChange={ (_event, value) => updateParams({ page: value }) }
          />
        </Box>
      ) }

      <ConfirmDialog
        isOpen={ deleteTarget !== null }
        title="게시물 삭제"
        message={ `"${deleteTarget?.title ?? ''}" 게시물을 삭제할까요? 댓글과 좋아요도 함께 삭제돼요.` }
        isLoading={ isDeleting }
        onConfirm={ handleDelete }
        onClose={ () => setDeleteTarget(null) }
      />
    </Box>
  );
}

export default PostListPage;
