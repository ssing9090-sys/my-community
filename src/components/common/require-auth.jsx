import { Navigate, useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import PageLoader from '../ui/page-loader.jsx';
import { useAuth } from '../../hooks/use-auth.js';

/**
 * RequireAuth 컴포넌트 - 로그인한 사용자만 하위 화면을 볼 수 있게 보호
 *
 * Props:
 * @param {node} children - 로그인 후 보여줄 화면 [Required]
 *
 * Example usage:
 * <RequireAuth><PostWritePage /></RequireAuth>
 */
function RequireAuth({ children }) {
  const location = useLocation();
  const { user, profile, isLoading } = useAuth();

  if (isLoading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace state={ { from: location.pathname } } />;
  if (!profile) {
    return <Alert severity="error">회원 정보를 불러오지 못했어요. 로그아웃 후 다시 로그인해 주세요.</Alert>;
  }

  return children;
}

export default RequireAuth;
