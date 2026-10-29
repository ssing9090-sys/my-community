import { useState } from 'react';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useAuth } from '../hooks/use-auth.js';
import { supabase } from '../lib/supabase.js';
import { isValidEmail } from '../utils/validators.js';

const ERROR_MESSAGES = {
  'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않아요.',
  'Email not confirmed': '이메일 인증을 먼저 완료해 주세요. 받은 메일함을 확인해 주세요.',
};

/**
 * LoginPage 컴포넌트 - 이메일 / 비밀번호 로그인
 *
 * Props: 없음
 *
 * Example usage:
 * <Route path="/login" element={ <LoginPage /> } />
 */
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const redirectPath = location.state?.from ?? '/';

  if (user) return <Navigate to={ redirectPath } replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidEmail(email) || !password) {
      setErrorMessage('이메일과 비밀번호를 정확히 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setIsSubmitting(false);
    if (error) {
      setErrorMessage(ERROR_MESSAGES[error.message] ?? '로그인하지 못했어요. 잠시 후 다시 시도해 주세요.');
      return;
    }
    navigate(redirectPath, { replace: true });
  };

  return (
    <Box sx={ { display: 'flex', justifyContent: 'center' } }>
      <Paper sx={ { p: { xs: 3, md: 5 }, width: '100%', maxWidth: 440 } }>
        <Box sx={ { textAlign: 'center', mb: 3 } }>
          <Box sx={ { fontSize: '2.5rem' } }>💄</Box>
          <Typography variant="h4" component="h1" sx={ { color: 'primary.dark', fontSize: { xs: '1.7rem', md: '2rem' } } }>
            로그인
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={ { mt: 0.5 } }>
            현진이의 화장대에 오신 걸 환영해요
          </Typography>
        </Box>

        { errorMessage && <Alert severity="error" sx={ { mb: 2 } }>{ errorMessage }</Alert> }

        <Box component="form" onSubmit={ handleSubmit } noValidate sx={ { display: 'flex', flexDirection: 'column', gap: 2 } }>
          <TextField
            label="이메일"
            type="email"
            value={ email }
            onChange={ (event) => setEmail(event.target.value) }
            autoComplete="email"
            fullWidth
          />
          <TextField
            label="비밀번호"
            type="password"
            value={ password }
            onChange={ (event) => setPassword(event.target.value) }
            autoComplete="current-password"
            fullWidth
          />
          <Button type="submit" variant="contained" size="large" fullWidth disabled={ isSubmitting }>
            { isSubmitting ? '로그인 중...' : '로그인' }
          </Button>
        </Box>

        <Box sx={ { textAlign: 'center', mt: 3, fontSize: '0.9rem', color: 'text.secondary' } }>
          아직 회원이 아니신가요?
          <Button component={ RouterLink } to="/signup" size="small" sx={ { ml: 0.5 } }>회원가입</Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;
