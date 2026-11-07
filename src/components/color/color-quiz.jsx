import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { QUIZ_QUESTIONS } from '../../utils/personal-color.js';

/**
 * ColorQuiz 컴포넌트 - 문진을 한 문항씩 보여주고 답을 모은다
 *
 * Props:
 * @param {function} onComplete - 모든 문항에 답하면 실행, 인자로 { [문항 id]: 선택값 } 전달 [Required]
 *
 * Example usage:
 * <ColorQuiz onComplete={ handleQuizComplete } />
 */
function ColorQuiz({ onComplete }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = QUIZ_QUESTIONS[questionIndex];
  const progress = (questionIndex / QUIZ_QUESTIONS.length) * 100;

  const handleSelect = (value) => {
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);
    if (questionIndex === QUIZ_QUESTIONS.length - 1) onComplete(nextAnswers);
    else setQuestionIndex(questionIndex + 1);
  };

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', gap: 3 } }>
      <Box>
        <Box sx={ { display: 'flex', justifyContent: 'space-between', mb: 1 } }>
          <Typography variant="body2" color="text.secondary">
            { questionIndex + 1 } / { QUIZ_QUESTIONS.length }
          </Typography>
          { questionIndex > 0 && (
            <Button
              size="small"
              color="inherit"
              startIcon={ <ArrowBackIcon /> }
              onClick={ () => setQuestionIndex(questionIndex - 1) }
            >
              이전
            </Button>
          ) }
        </Box>
        <LinearProgress
          variant="determinate"
          value={ progress }
          aria-label="문진 진행률"
          sx={ { height: 8, borderRadius: 999, bgcolor: 'primary.light' } }
        />
      </Box>

      <Box>
        <Typography variant="h5" component="h2">{ question.title }</Typography>
        { question.hint && (
          <Typography variant="body2" color="text.secondary" sx={ { mt: 0.5 } }>{ question.hint }</Typography>
        ) }
      </Box>

      <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1.5 } }>
        { question.options.map((option) => (
          <Button
            key={ option.value }
            variant={ answers[question.id] === option.value ? 'contained' : 'outlined' }
            onClick={ () => handleSelect(option.value) }
            sx={ { minHeight: 56, justifyContent: 'flex-start', px: 3, fontSize: '1rem' } }
          >
            { option.label }
          </Button>
        )) }
      </Box>
    </Box>
  );
}

export default ColorQuiz;
