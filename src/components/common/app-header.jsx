import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import MenuIcon from '@mui/icons-material/Menu';

import { useAuth } from '../../hooks/use-auth.js';
import { SITE_NAME } from '../../utils/site-config.js';

const NAV_ITEMS = [
  { label: '게시판', path: '/' },
  { label: '글쓰기', path: '/posts/new' },
  { label: '고객센터', path: '/support' },
];

/**
 * AppHeader 컴포넌트 - 로고, 메뉴, 로그인 상태를 보여주는 상단 바
 *
 * Props: 없음
 *
 * Example usage:
 * <AppHeader />
 */
function AppHeader() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleNavigate = (path) => {
    setMenuAnchor(null);
    navigate(path);
  };

  const handleSignOut = async () => {
    setMenuAnchor(null);
    await signOut();
    navigate('/');
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={ {
        bgcolor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '2px dashed',
        borderColor: 'primary.light',
      } }
    >
      <Container maxWidth="md" sx={ { px: { xs: 2, md: 3 } } }>
        <Toolbar disableGutters sx={ { gap: 1 } }>
          <Box
            component={ RouterLink }
            to="/"
            sx={ { display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1, textDecoration: 'none' } }
          >
            <Box
              sx={ {
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'primary.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              } }
            >
              <FaceRetouchingNaturalIcon sx={ { color: 'primary.dark' } } />
            </Box>
            <Typography
              component="span"
              variant="h5"
              sx={ { color: 'primary.dark', fontSize: { xs: '1.2rem', md: '1.5rem' } } }
            >
              { SITE_NAME }
            </Typography>
          </Box>

          <Box sx={ { display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 } }>
            { NAV_ITEMS.map((item) => (
              <Button key={ item.path } component={ RouterLink } to={ item.path } color="inherit">
                { item.label }
              </Button>
            )) }
            { user ? (
              <>
                <Chip label={ `${profile?.name ?? '회원'}님` } color="primary" variant="outlined" sx={ { mx: 1 } } />
                <Button onClick={ handleSignOut } color="inherit">로그아웃</Button>
              </>
            ) : (
              <Button component={ RouterLink } to="/login" variant="contained" sx={ { ml: 1 } }>
                로그인
              </Button>
            ) }
          </Box>

          <IconButton
            aria-label="메뉴 열기"
            onClick={ (event) => setMenuAnchor(event.currentTarget) }
            sx={ { display: { xs: 'inline-flex', md: 'none' }, color: 'primary.dark' } }
          >
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={ menuAnchor } open={ Boolean(menuAnchor) } onClose={ () => setMenuAnchor(null) }>
            { user && (
              <MenuItem disabled sx={ { opacity: '1 !important', fontWeight: 700, color: 'primary.dark' } }>
                { `${profile?.name ?? '회원'}님 반가워요` }
              </MenuItem>
            ) }
            { NAV_ITEMS.map((item) => (
              <MenuItem key={ item.path } onClick={ () => handleNavigate(item.path) }>{ item.label }</MenuItem>
            )) }
            <Divider />
            { user ? (
              <MenuItem onClick={ handleSignOut }>로그아웃</MenuItem>
            ) : (
              <MenuItem onClick={ () => handleNavigate('/login') }>로그인</MenuItem>
            ) }
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppHeader;
