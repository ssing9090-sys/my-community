import { Link as RouterLink } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import { SEASONS, toSharedPost } from '../../utils/personal-color.js';

const swatchListSx = { display: 'grid', gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(6, 1fr)' }, gap: 1.5 };

/** 색 견본 하나 */
function ColorChip({ name, hex }) {
  return (
    <Box sx={ { minWidth: 0, textAlign: 'center' } }>
      <Box sx={ { aspectRatio: '1', borderRadius: 3, bgcolor: hex, border: 1, borderColor: 'divider' } } />
      <Typography variant="caption" component="p" sx={ { mt: 0.5, wordBreak: 'keep-all' } }>{ name }</Typography>
    </Box>
  );
}

/**
 * AnalysisResult 컴포넌트 - 진단 결과와 메이크업 추천
 *
 * Props:
 * @param {object} analysis - 진단 결과 { season, result } [Required]
 *
 * Example usage:
 * <AnalysisResult analysis={ analysis } />
 */
function AnalysisResult({ analysis }) {
  const season = SEASONS[analysis.season];
  const { result } = analysis;

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', gap: 3 } }>
      <Box
        sx={ {
          p: { xs: 3, md: 4 },
          borderRadius: 6,
          textAlign: 'center',
          background: `linear-gradient(135deg, ${season.swatches[0]}55 0%, ${season.swatches[1]}55 50%, ${season.swatches[3]}55 100%)`,
        } }
      >
        <Box sx={ { fontSize: '2.5rem' } } aria-hidden>{ season.emoji }</Box>
        <Typography variant="body2" color="text.secondary">당신의 퍼스널컬러는</Typography>
        <Typography variant="h4" component="h2" sx={ { my: 0.5 } }>{ season.label }</Typography>
        <Box sx={ { display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mt: 1 } }>
          <Chip size="small" label={ `일치도 ${result.confidence}` } sx={ { bgcolor: 'background.paper' } } />
        </Box>
        <Typography sx={ { mt: 2, wordBreak: 'keep-all' } }>{ result.summary }</Typography>
      </Box>

      <Paper variant="outlined" sx={ { p: { xs: 2.5, md: 3 } } }>
        <Typography variant="h6" component="h3" sx={ { mb: 1 } }>이렇게 판단했어요</Typography>
        <Box component="ul" sx={ { m: 0, pl: 2.5 } }>
          { result.reasons.map((reason) => <li key={ reason }><Typography variant="body2">{ reason }</Typography></li>) }
        </Box>
      </Paper>

      <Paper variant="outlined" sx={ { p: { xs: 2.5, md: 3 } } }>
        <Typography variant="h6" component="h3" sx={ { mb: 2 } }>잘 어울리는 색</Typography>
        <Box sx={ swatchListSx }>
          { result.best_colors.map((color) => <ColorChip key={ color.name } { ...color } />) }
        </Box>
        <Typography variant="h6" component="h3" sx={ { mt: 3, mb: 2 } }>피하면 좋은 색</Typography>
        <Box sx={ swatchListSx }>
          { result.avoid_colors.map((color) => <ColorChip key={ color.name } { ...color } />) }
        </Box>
      </Paper>

      <Paper variant="outlined" sx={ { p: { xs: 2.5, md: 3 } } }>
        <Typography variant="h6" component="h3" sx={ { mb: 2 } }>나를 위한 메이크업</Typography>
        <Box sx={ { display: 'flex', flexDirection: 'column', gap: 2 } }>
          { result.makeup.map((item) => (
            <Box key={ item.part } sx={ { display: 'flex', gap: 2, alignItems: 'flex-start' } }>
              <Box sx={ { width: 44, height: 44, flexShrink: 0, borderRadius: '50%', bgcolor: item.hex, border: 1, borderColor: 'divider' } } />
              <Box sx={ { minWidth: 0 } }>
                <Typography sx={ { fontWeight: 700 } }>{ item.part } · { item.color_name }</Typography>
                <Typography variant="body2" color="text.secondary" sx={ { wordBreak: 'keep-all' } }>{ item.how_to }</Typography>
              </Box>
            </Box>
          )) }
        </Box>
        <Alert severity="info" icon={ false } sx={ { mt: 2.5 } }>💡 { result.tip }</Alert>
      </Paper>

      <Typography variant="caption" color="text.secondary" sx={ { textAlign: 'center' } }>
        답변을 점수로 계산한 간단한 진단이라 참고용으로 봐 주세요. 정확한 진단은 전문가 드레이핑을 추천해요.
      </Typography>

      <Button
        component={ RouterLink }
        to="/posts/new"
        state={ { prefill: toSharedPost(analysis) } }
        variant="contained"
        startIcon={ <ShareOutlinedIcon /> }
        sx={ { alignSelf: 'center' } }
      >
        게시판에 자랑하기
      </Button>
    </Box>
  );
}

export default AnalysisResult;
