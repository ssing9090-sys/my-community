import { Navigate, Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import AppFooter from './components/common/app-footer.jsx';
import AppHeader from './components/common/app-header.jsx';
import RequireAuth from './components/common/require-auth.jsx';
import LoginPage from './pages/login-page.jsx';
import PostDetailPage from './pages/post-detail-page.jsx';
import PostEditPage from './pages/post-edit-page.jsx';
import PostListPage from './pages/post-list-page.jsx';
import PostWritePage from './pages/post-write-page.jsx';
import SignupPage from './pages/signup-page.jsx';
import SupportPage from './pages/support-page.jsx';

/**
 * App 컴포넌트 - 전체 레이아웃(헤더 / 본문 / 푸터)과 라우팅
 *
 * Props: 없음
 *
 * Example usage:
 * <App />
 */
function App() {
  return (
    <Box sx={ { width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' } }>
      <AppHeader />
      <Box
        component="main"
        sx={ {
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 2, md: 4 },
        } }
      >
        <Container maxWidth="md" sx={ { py: 4, px: { xs: 2, md: 3 } } }>
          <Routes>
            <Route path="/" element={ <PostListPage /> } />
            <Route path="/posts/new" element={ <RequireAuth><PostWritePage /></RequireAuth> } />
            <Route path="/posts/:postId" element={ <PostDetailPage /> } />
            <Route path="/posts/:postId/edit" element={ <RequireAuth><PostEditPage /></RequireAuth> } />
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/signup" element={ <SignupPage /> } />
            <Route path="/support" element={ <SupportPage /> } />
            <Route path="*" element={ <Navigate to="/" replace /> } />
          </Routes>
        </Container>
      </Box>
      <AppFooter />
    </Box>
  );
}

export default App;
