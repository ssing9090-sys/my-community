import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseIcon from '@mui/icons-material/Close';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPT_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

/**
 * ImageUploader 컴포넌트 - 사진 선택, 미리보기, 삭제
 *
 * Props:
 * @param {File|null} imageFile - 새로 선택한 사진 파일 [Optional, 기본값: null]
 * @param {string|null} imageUrl - 이미 저장된 사진 URL [Optional, 기본값: null]
 * @param {function} onChange - 사진 선택 시 실행, 인자로 File 전달 [Required]
 * @param {function} onRemove - 사진 삭제 버튼 클릭 시 실행 [Required]
 *
 * Example usage:
 * <ImageUploader imageFile={ file } imageUrl={ url } onChange={ setFile } onRemove={ handleRemove } />
 */
function ImageUploader({ imageFile = null, imageUrl = null, onChange, onRemove }) {
  const [errorMessage, setErrorMessage] = useState('');
  const previewUrl = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : imageUrl),
    [imageFile, imageUrl],
  );

  useEffect(() => () => {
    if (imageFile && previewUrl) URL.revokeObjectURL(previewUrl);
  }, [imageFile, previewUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!ACCEPT_TYPES.includes(file.type)) {
      setErrorMessage('JPG, PNG, GIF, WEBP 사진만 올릴 수 있어요.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage('사진은 5MB 이하만 올릴 수 있어요.');
      return;
    }
    setErrorMessage('');
    onChange(file);
  };

  return (
    <Box>
      { previewUrl ? (
        <Box sx={ { position: 'relative', display: 'inline-block' } }>
          <Box
            component="img"
            src={ previewUrl }
            alt="첨부 사진 미리보기"
            sx={ { maxWidth: '100%', maxHeight: 240, borderRadius: 3, display: 'block', border: '1px solid', borderColor: 'divider' } }
          />
          <IconButton
            aria-label="사진 삭제"
            size="small"
            onClick={ onRemove }
            sx={ { position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255, 255, 255, 0.9)', '&:hover': { bgcolor: '#FFFFFF' } } }
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Button
          component="label"
          variant="outlined"
          color="secondary"
          startIcon={ <AddPhotoAlternateOutlinedIcon /> }
          sx={ { borderStyle: 'dashed' } }
        >
          사진 올리기
          <input hidden type="file" accept={ ACCEPT_TYPES.join(',') } onChange={ handleFileChange } />
        </Button>
      ) }
      { errorMessage && (
        <Typography variant="caption" color="error" component="p" sx={ { mt: 0.5 } }>{ errorMessage }</Typography>
      ) }
    </Box>
  );
}

export default ImageUploader;
