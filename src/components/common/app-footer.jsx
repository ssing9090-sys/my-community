import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import { INSTAGRAM_URL, SITE_NAME } from '../../utils/site-config.js';

const CURRENT_YEAR = new Date().getFullYear();

/**
 * AppFooter 컴포넌트 - 인스타그램 연결 버튼과 고객센터 링크가 있는 하단 영역
 *
 * Props: 없음
 *
 * Example usage:
 * <AppFooter />
 */
function AppFooter() {
  return (
    <Box
      component="footer"
      sx={ (theme) => ({
        width: '100%',
        py: { xs: 3, md: 4 },
        background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.success.light} 100%)`,
      }) }
    >
      <Container
        maxWidth="md"
        sx={ {
          px: { xs: 2, md: 3 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        } }
      >
        <Box sx={ { textAlign: { xs: 'center', md: 'left' } } }>
          <Typography variant="h6" sx={ { color: 'secondary.dark' } }>{ SITE_NAME }</Typography>
          <Typography variant="body2" color="text.secondary">
            나한테 딱 맞는 화장법, 함께 찾아요 💕
          </Typography>
        </Box>
        <Box sx={ { display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' } }>
          <Button
            href={ INSTAGRAM_URL }
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            startIcon={ <InstagramIcon /> }
            sx={ { background: 'linear-gradient(45deg, #FDCB82, #F48FB1, #C39BD3)', color: '#FFFFFF' } }
          >
            인스타그램
          </Button>
          <Button
            component={ RouterLink }
            to="/support"
            variant="outlined"
            color="secondary"
            startIcon={ <SupportAgentIcon /> }
            sx={ { bgcolor: 'background.paper' } }
          >
            고객센터
          </Button>
        </Box>
      </Container>
      <Typography variant="caption" component="p" color="text.secondary" sx={ { textAlign: 'center', mt: 2 } }>
        © { CURRENT_YEAR } { SITE_NAME }. All rights reserved.
      </Typography>
    </Box>
  );
}

export default AppFooter;
