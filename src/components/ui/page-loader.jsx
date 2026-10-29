import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * PageLoader 컴포넌트 - 데이터 로딩 중 가운데에 표시하는 스피너
 *
 * Props: 없음
 *
 * Example usage:
 * <PageLoader />
 */
function PageLoader() {
  return (
    <Box sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 } }>
      <CircularProgress color="primary" />
    </Box>
  );
}

export default PageLoader;
