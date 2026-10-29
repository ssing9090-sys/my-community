import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ_ITEMS = [
  {
    question: '회원가입은 어떻게 하나요?',
    answer: '로그인 화면의 "회원가입" 버튼을 눌러 이름, 이메일, 비밀번호, 전화번호를 입력하면 바로 가입돼요.',
  },
  {
    question: '사진은 몇 장까지 올릴 수 있나요?',
    answer: '게시물 하나에 사진 1장(5MB 이하, JPG / PNG / GIF / WEBP)을 올릴 수 있어요.',
  },
  {
    question: '내가 쓴 글은 어떻게 수정하거나 삭제하나요?',
    answer: '게시판 목록이나 게시물 상세 화면에서 내가 쓴 글에만 보이는 "수정", "삭제" 버튼을 눌러 주세요.',
  },
  {
    question: '별점은 무엇인가요?',
    answer: '소개하는 화장법이나 제품이 얼마나 마음에 들었는지 1~5점으로 남기는 나만의 평가예요. 선택 사항이에요.',
  },
];

/**
 * FaqList 컴포넌트 - 고객센터 자주 묻는 질문 목록
 *
 * Props: 없음
 *
 * Example usage:
 * <FaqList />
 */
function FaqList() {
  return (
    <Box>
      { FAQ_ITEMS.map((item) => (
        <Accordion key={ item.question } disableGutters elevation={ 0 } sx={ { border: '1px solid', borderColor: 'divider', mb: 1, borderRadius: '12px !important', '&::before': { display: 'none' } } }>
          <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
            <Typography sx={ { fontWeight: 700 } }>Q. { item.question }</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">{ item.answer }</Typography>
          </AccordionDetails>
        </Accordion>
      )) }
    </Box>
  );
}

export default FaqList;
