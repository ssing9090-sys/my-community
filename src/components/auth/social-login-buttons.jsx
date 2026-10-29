import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import GoogleIcon from '@mui/icons-material/Google';

import { supabase } from '../../lib/supabase.js';

/**
 * SocialLoginButtons 컴포넌트 - 구글 / 카카오 계정 연결 로그인 버튼
 *
 * Props:
 * @param {function} onError - 로그인 요청 실패 시 실행, 인자로 에러 메시지 전달 [Optional]
 *
 * Example usage:
 * <SocialLoginButtons onError={ setErrorMessage } />
 */
function SocialLoginButtons({ onError }) {
  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}` },
    });
    if (error && onError) onError('소셜 로그인을 시작하지 못했어요. 잠시 후 다시 시도해 주세요.');
  };

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1.5 } }>
      <Button
        fullWidth
        size="large"
        variant="outlined"
        startIcon={ <GoogleIcon /> }
        onClick={ () => handleOAuthLogin('google') }
        sx={ { color: 'text.primary', borderColor: 'divider', bgcolor: '#FFFFFF' } }
      >
        구글 계정으로 로그인
      </Button>
      <Button
        fullWidth
        size="large"
        variant="contained"
        startIcon={ <ChatBubbleIcon /> }
        onClick={ () => handleOAuthLogin('kakao') }
        sx={ { bgcolor: '#FEE500', color: '#191919', '&:hover': { bgcolor: '#F2D900' } } }
      >
        카카오 계정으로 로그인
      </Button>
    </Box>
  );
}

export default SocialLoginButtons;
