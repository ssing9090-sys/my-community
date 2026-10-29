import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { fetchMyInquiries } from '../../utils/community-api.js';
import { formatDateTime } from '../../utils/format-date.js';

/**
 * MyInquiryList 컴포넌트 - 로그인 사용자가 남긴 문의 내역
 *
 * Props:
 * @param {number} userId - users 테이블의 사용자 번호 [Required]
 * @param {number} refreshKey - 값이 바뀌면 목록을 다시 불러옴 [Optional, 기본값: 0]
 *
 * Example usage:
 * <MyInquiryList userId={ profile.id } refreshKey={ refreshKey } />
 */
function MyInquiryList({ userId, refreshKey = 0 }) {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    let isActive = true;
    fetchMyInquiries(userId).then(({ data }) => {
      if (isActive) setInquiries(data ?? []);
    });
    return () => {
      isActive = false;
    };
  }, [userId, refreshKey]);

  if (inquiries.length === 0) {
    return <Typography color="text.secondary">아직 남긴 문의가 없어요.</Typography>;
  }

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1 } }>
      { inquiries.map((inquiry) => (
        <Box
          key={ inquiry.id }
          sx={ { p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1.5 } }
        >
          <Chip
            label={ inquiry.status }
            size="small"
            color={ inquiry.status === '답변완료' ? 'success' : 'secondary' }
          />
          <Box sx={ { flex: 1, minWidth: 0 } }>
            <Box sx={ { fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }>
              { inquiry.title }
            </Box>
            <Box sx={ { fontSize: '0.75rem', color: 'text.secondary' } }>{ formatDateTime(inquiry.created_at) }</Box>
          </Box>
        </Box>
      )) }
    </Box>
  );
}

export default MyInquiryList;
