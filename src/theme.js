import { createTheme } from '@mui/material/styles';

const HEADING_FONT = '"Jua", "Gowun Dodum", "Roboto", sans-serif';

/**
 * 현진이의 화장대 테마 - 파스텔톤 (핑크, 화이트, 스카이블루, 민트그린)
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#F48FB1',
      light: '#FCE4EC',
      dark: '#D9628E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#81C4EE',
      light: '#E3F2FD',
      dark: '#4A9BD1',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#7FD6B4',
      light: '#E0F7EF',
      dark: '#3FA883',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFF7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#4A3B44',
      secondary: '#8A7482',
    },
    divider: '#F7DCE7',
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Gowun Dodum", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: HEADING_FONT },
    h2: { fontFamily: HEADING_FONT },
    h3: { fontFamily: HEADING_FONT },
    h4: { fontFamily: HEADING_FONT, lineHeight: 1.3 },
    h5: { fontFamily: HEADING_FONT, lineHeight: 1.3 },
    h6: { fontFamily: HEADING_FONT, lineHeight: 1.4 },
    button: { fontWeight: 700, textTransform: 'none' },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.5 },
  },
  spacing: 8,
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, paddingLeft: 18, paddingRight: 18 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: { boxShadow: '0 8px 24px rgba(244, 143, 177, 0.15)' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 700 },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
    },
  },
});

export default theme;
