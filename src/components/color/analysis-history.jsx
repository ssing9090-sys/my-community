import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';

import { formatRelativeTime } from '../../utils/format-date.js';
import { SEASONS } from '../../utils/personal-color.js';

/**
 * AnalysisHistory 컴포넌트 - 내 지난 진단 기록 목록
 *
 * Props:
 * @param {object[]} analyses - 저장된 진단 기록 목록 [Required]
 * @param {function} onSelect - 기록을 열 때 실행, 인자로 기록 전달 [Required]
 * @param {function} onDelete - 기록 삭제 시 실행, 인자로 기록 전달 [Required]
 *
 * Example usage:
 * <AnalysisHistory analyses={ analyses } onSelect={ setSelected } onDelete={ handleDelete } />
 */
function AnalysisHistory({ analyses, onSelect, onDelete }) {
  if (analyses.length === 0) return null;

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1.5 } }>
      <Typography variant="h6" component="h2">내 진단 기록</Typography>
      { analyses.map((analysis) => {
        const season = SEASONS[analysis.season];
        return (
          <Paper key={ analysis.id } variant="outlined" sx={ { display: 'flex', alignItems: 'center', gap: 1, p: 1 } }>
            <Button
              color="inherit"
              onClick={ () => onSelect(analysis) }
              sx={ { flex: 1, minWidth: 0, justifyContent: 'flex-start', gap: 1 } }
            >
              <Box component="span" aria-hidden>{ season.emoji }</Box>
              { season.label }
              <Typography component="span" variant="caption" color="text.secondary">
                { formatRelativeTime(analysis.created_at) }
              </Typography>
            </Button>
            <IconButton aria-label={ `${season.label} 기록 삭제` } onClick={ () => onDelete(analysis) }>
              <DeleteOutlineIcon />
            </IconButton>
          </Paper>
        );
      }) }
    </Box>
  );
}

export default AnalysisHistory;
