import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import PostListItem from '../components/post/post-list-item.jsx';
import { fetchPosts } from '../utils/community-api.js';
import { SEASONS } from '../utils/personal-color.js';

const LATEST_POST_COUNT = 3;

const STEPS = [
  { emoji: '📝', title: '10가지 문진', description: '피부와 머리색, 원하는 분위기를 골라요.' },
  { emoji: '🎨', title: '내 타입 확인', description: '답변을 분석해 8가지 타입 중 내 색을 찾아요.' },
  { emoji: '💄', title: '맞춤 메이크업', description: '내 색과 실력에 맞는 화장법을 받아요.' },
];

/**
 * HomePage 컴포넌트 - 서비스 소개와 진단 안내, 최신 글을 보여주는 첫 화면
 *
 * Props: 없음
 *
 * Example usage:
 * <Route path="/" element={ <HomePage /> } />
 */
function HomePage() {
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    let isActive = true;
    fetchPosts({ page: 1 }).then(({ data }) => {
      if (isActive && data) setLatestPosts(data.slice(0, LATEST_POST_COUNT));
    });
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', gap: { xs: 5, md: 7 } } }>
      <Box
        sx={ (theme) => ({
          px: { xs: 3, md: 6 },
          py: { xs: 5, md: 8 },
          borderRadius: 6,
          textAlign: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 60%, ${theme.palette.success.light} 100%)`,
        }) }
      >
        <Typography color="primary.dark" sx={ { fontWeight: 700, mb: 1 } }>✨ 무료 퍼스널컬러 진단</Typography>
        <Typography
          variant="h3"
          component="h1"
          sx={ { fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.25, wordBreak: 'keep-all' } }
        >
          내게 꼭 맞는 색,
          <br />
          10가지 질문으로 찾아요
        </Typography>
        <Typography color="text.secondary" sx={ { mt: 2, fontSize: { xs: '1rem', md: '1.15rem' }, wordBreak: 'keep-all' } }>
          퍼스널컬러를 찾고, 그 색에 맞는 화장법까지 추천받으세요.
        </Typography>
        <Box sx={ { display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap', mt: 4 } }>
          <Button component={ RouterLink } to="/color" variant="contained" size="large" startIcon={ <AutoAwesomeIcon /> }>
            무료로 진단받기
          </Button>
          <Button component={ RouterLink } to="/board" variant="outlined" size="large" sx={ { bgcolor: 'background.paper' } }>
            게시판 구경하기
          </Button>
        </Box>
      </Box>

      <Box component="section">
        <Typography variant="h5" component="h2" sx={ { textAlign: 'center', mb: 3 } }>이렇게 진행돼요</Typography>
        <Box sx={ { display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 } }>
          { STEPS.map((step) => (
            <Paper key={ step.title } variant="outlined" sx={ { p: 3, textAlign: 'center' } }>
              <Box sx={ { fontSize: '2rem' } } aria-hidden>{ step.emoji }</Box>
              <Typography sx={ { fontWeight: 700, mt: 1 } }>{ step.title }</Typography>
              <Typography variant="body2" color="text.secondary" sx={ { mt: 0.5, wordBreak: 'keep-all' } }>
                { step.description }
              </Typography>
            </Paper>
          )) }
        </Box>
      </Box>

      <Box component="section">
        <Typography variant="h5" component="h2" sx={ { textAlign: 'center' } }>나는 어떤 타입일까요?</Typography>
        <Typography color="text.secondary" sx={ { textAlign: 'center', mt: 0.5, mb: 3 } }>
          사계절 8가지 타입 중 나의 색을 찾아보세요
        </Typography>
        <Box sx={ { display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 } }>
          { Object.entries(SEASONS).map(([id, season]) => (
            <Paper key={ id } variant="outlined" sx={ { p: 2, overflow: 'hidden' } }>
              <Box sx={ { display: 'flex', height: 40, borderRadius: 2, overflow: 'hidden', mb: 1.5 } }>
                { season.swatches.map((color) => <Box key={ color } sx={ { flex: 1, bgcolor: color } } />) }
              </Box>
              <Typography sx={ { fontWeight: 700, fontSize: '0.95rem' } }>{ season.emoji } { season.label }</Typography>
              <Typography variant="caption" color="text.secondary">{ season.keyword }</Typography>
            </Paper>
          )) }
        </Box>
      </Box>

      { latestPosts.length > 0 && (
        <Box component="section">
          <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 } }>
            <Typography variant="h5" component="h2">최신 이야기</Typography>
            <Button component={ RouterLink } to="/board" endIcon={ <ArrowForwardIcon /> }>더 보기</Button>
          </Box>
          <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1.5 } }>
            { latestPosts.map((post) => <PostListItem key={ post.id } post={ post } />) }
          </Box>
        </Box>
      ) }
    </Box>
  );
}

export default HomePage;
