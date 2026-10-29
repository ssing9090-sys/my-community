import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';

import FaqList from '../components/support/faq-list.jsx';
import InquiryForm from '../components/support/inquiry-form.jsx';
import MyInquiryList from '../components/support/my-inquiry-list.jsx';
import { useAuth } from '../hooks/use-auth.js';

const CONTACT_CARDS = [
  { icon: <AccessTimeIcon />, title: '운영 시간', description: '평일 10:00 ~ 18:00\n(주말·공휴일 휴무)', color: 'primary' },
  { icon: <MailOutlineIcon />, title: '1:1 문의', description: '아래 문의하기로 남겨 주시면\n이메일로 답변 드려요', color: 'secondary' },
];

/**
 * SupportPage 컴포넌트 - 고객센터 (운영 안내, FAQ, 문의사항 작성, 내 문의 내역)
 *
 * Props: 없음
 *
 * Example usage:
 * <Route path="/support" element={ <SupportPage /> } />
 */
function SupportPage() {
  const { isLoading, profile } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', gap: 3 } }>
      <Box sx={ { textAlign: 'center' } }>
        <Typography variant="h3" component="h1" sx={ { color: 'primary.dark', fontSize: { xs: '1.8rem', md: '2.6rem' } } }>
          고객센터 🎀
        </Typography>
        <Typography color="text.secondary" sx={ { mt: 1 } }>궁금한 점이 있다면 언제든 물어봐 주세요</Typography>
      </Box>

      <Grid container spacing={ 2 }>
        { CONTACT_CARDS.map((card) => (
          <Grid key={ card.title } size={ { xs: 12, md: 6 } }>
            <Paper sx={ { p: 3, height: '100%', textAlign: 'center' } }>
              <Box
                sx={ {
                  width: 52,
                  height: 52,
                  mx: 'auto',
                  mb: 1.5,
                  borderRadius: '50%',
                  bgcolor: `${card.color}.light`,
                  color: `${card.color}.dark`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                } }
              >
                { card.icon }
              </Box>
              <Typography variant="h6" component="h2">{ card.title }</Typography>
              <Typography variant="body2" color="text.secondary" sx={ { whiteSpace: 'pre-line', mt: 0.5 } }>
                { card.description }
              </Typography>
            </Paper>
          </Grid>
        )) }
      </Grid>

      <Paper sx={ { p: { xs: 2.5, md: 4 } } }>
        <Typography variant="h5" component="h2" sx={ { mb: 2 } }>자주 묻는 질문</Typography>
        <FaqList />
      </Paper>

      <Paper sx={ { p: { xs: 2.5, md: 4 } } }>
        <Typography variant="h5" component="h2" sx={ { mb: 2 } }>문의하기</Typography>
        { !isLoading && (
          <InquiryForm key={ profile?.id ?? 'guest' } onSubmitted={ () => setRefreshKey((key) => key + 1) } />
        ) }
      </Paper>

      { profile && (
        <Paper sx={ { p: { xs: 2.5, md: 4 } } }>
          <Typography variant="h5" component="h2" sx={ { mb: 2 } }>내 문의 내역</Typography>
          <MyInquiryList userId={ profile.id } refreshKey={ refreshKey } />
        </Paper>
      ) }
    </Box>
  );
}

export default SupportPage;
