import { useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useAuth } from '../hooks/use-auth.js';
import { supabase } from '../lib/supabase.js';
import { isValidEmail, isValidPhone } from '../utils/validators.js';

const INITIAL_FORM = { name: '', email: '', password: '', passwordConfirm: '', phone: '' };

/**
 * SignupPage 컴포넌트 - 회원가입 (이름, 이메일, 비밀번호, 전화번호)
 *
 * Props: 없음
 *
 * Example usage:
 * <Route path="/signup" element={ <SignupPage /> } />
 */
function SignupPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ severity: 'error', text: '' });

  if (user) return <Navigate to="/" replace />;

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = '이름을 입력해 주세요.';
    if (!isValidEmail(form.email)) nextErrors.email = '이메일 형식이 올바르지 않아요.';
    if (form.password.length < 6) nextErrors.password = '비밀번호는 6자 이상이어야 해요.';
    if (form.password !== form.passwordConfirm) nextErrors.passwordConfirm = '비밀번호가 일치하지 않아요.';
    if (!isValidPhone(form.phone)) nextErrors.phone = '010-1234-5678 형식으로 입력해 주세요.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        data: { name: form.name.trim(), phone: form.phone.trim() },
        emailRedirectTo: `${window.location.origin}${import.meta.env.BASE_URL}`,
      },
    });
    setIsSubmitting(false);

    const isDuplicated = error?.message.includes('already registered') || data?.user?.identities?.length === 0;
    if (error || isDuplicated) {
      setMessage({ severity: 'error', text: isDuplicated ? '이미 가입된 이메일이에요.' : '회원가입하지 못했어요. 잠시 후 다시 시도해 주세요.' });
      return;
    }
    if (data.session) {
      navigate('/', { replace: true });
      return;
    }
    setForm(INITIAL_FORM);
    setMessage({ severity: 'success', text: '가입 확인 메일을 보냈어요! 메일의 링크를 누르면 가입이 완료돼요 💌' });
  };

  return (
    <Box sx={ { display: 'flex', justifyContent: 'center' } }>
      <Paper sx={ { p: { xs: 3, md: 5 }, width: '100%', maxWidth: 480 } }>
        <Box sx={ { textAlign: 'center', mb: 3 } }>
          <Box sx={ { fontSize: '2.5rem' } }>🎀</Box>
          <Typography variant="h4" component="h1" sx={ { color: 'primary.dark', fontSize: { xs: '1.7rem', md: '2rem' } } }>
            회원가입
          </Typography>
        </Box>

        { message.text && <Alert severity={ message.severity } sx={ { mb: 2 } }>{ message.text }</Alert> }

        <Box component="form" onSubmit={ handleSubmit } noValidate sx={ { display: 'flex', flexDirection: 'column', gap: 2 } }>
          <TextField label="이름" value={ form.name } onChange={ handleChange('name') } error={ Boolean(errors.name) } helperText={ errors.name } fullWidth required />
          <TextField label="이메일" type="email" value={ form.email } onChange={ handleChange('email') } error={ Boolean(errors.email) } helperText={ errors.email ?? '로그인할 때 사용해요' } autoComplete="email" fullWidth required />
          <TextField label="비밀번호" type="password" value={ form.password } onChange={ handleChange('password') } error={ Boolean(errors.password) } helperText={ errors.password ?? '6자 이상' } autoComplete="new-password" fullWidth required />
          <TextField label="비밀번호 확인" type="password" value={ form.passwordConfirm } onChange={ handleChange('passwordConfirm') } error={ Boolean(errors.passwordConfirm) } helperText={ errors.passwordConfirm } autoComplete="new-password" fullWidth required />
          <TextField label="전화번호" type="tel" value={ form.phone } onChange={ handleChange('phone') } error={ Boolean(errors.phone) } helperText={ errors.phone } placeholder="010-1234-5678" autoComplete="tel" fullWidth required />
          <Button type="submit" variant="contained" size="large" fullWidth disabled={ isSubmitting }>
            { isSubmitting ? '가입 중...' : '가입하기' }
          </Button>
        </Box>

        <Box sx={ { textAlign: 'center', mt: 3, fontSize: '0.9rem', color: 'text.secondary' } }>
          이미 회원이신가요?
          <Button component={ RouterLink } to="/login" size="small" sx={ { ml: 0.5 } }>로그인</Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default SignupPage;
