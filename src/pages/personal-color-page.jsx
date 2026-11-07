import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ReplayIcon from '@mui/icons-material/Replay';

import AnalysisHistory from '../components/color/analysis-history.jsx';
import AnalysisResult from '../components/color/analysis-result.jsx';
import ColorQuiz from '../components/color/color-quiz.jsx';
import ConfirmDialog from '../components/ui/confirm-dialog.jsx';
import { diagnoseColor } from '../utils/color-diagnosis.js';
import { loadHistory, saveHistory } from '../utils/color-history.js';

/**
 * PersonalColorPage 컴포넌트 - 문진, 결과, 내 기록을 잇는 화면 (브라우저 안에서 무료로 계산)
 *
 * Props: 없음
 *
 * Example usage:
 * <Route path="/color" element={ <PersonalColorPage /> } />
 */
function PersonalColorPage() {
  const [selected, setSelected] = useState(null);
  const [analyses, setAnalyses] = useState(loadHistory);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const updateAnalyses = (nextAnalyses) => {
    setAnalyses(nextAnalyses);
    saveHistory(nextAnalyses);
  };

  const handleQuizComplete = (answers) => {
    const createdAt = new Date().toISOString();
    const analysis = { id: createdAt, created_at: createdAt, ...diagnoseColor(answers) };
    updateAnalyses([analysis, ...analyses]);
    setSelected(analysis);
  };

  const handleDelete = () => {
    updateAnalyses(analyses.filter((item) => item.id !== deleteTarget.id));
    if (selected?.id === deleteTarget.id) setSelected(null);
    setDeleteTarget(null);
  };

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', gap: 3 } }>
      <Box sx={ { textAlign: 'center' } }>
        <Typography variant="h4" component="h1" sx={ { color: 'primary.dark' } }>퍼스널컬러 진단</Typography>
        <Typography color="text.secondary" sx={ { mt: 0.5 } }>
          나에게 맞는 색을 찾고, 그 색으로 메이크업까지 추천받아요
        </Typography>
      </Box>

      { selected ? (
        <>
          <AnalysisResult analysis={ selected } />
          <Button color="inherit" startIcon={ <ReplayIcon /> } onClick={ () => setSelected(null) } sx={ { alignSelf: 'center' } }>
            다시 진단하기
          </Button>
        </>
      ) : (
        <Paper sx={ { p: { xs: 2.5, md: 4 } } }>
          <ColorQuiz onComplete={ handleQuizComplete } />
        </Paper>
      ) }

      <AnalysisHistory analyses={ analyses } onSelect={ setSelected } onDelete={ setDeleteTarget } />

      <ConfirmDialog
        isOpen={ deleteTarget !== null }
        title="진단 기록 삭제"
        message="이 진단 기록을 삭제할까요?"
        onConfirm={ handleDelete }
        onClose={ () => setDeleteTarget(null) }
      />
    </Box>
  );
}

export default PersonalColorPage;
