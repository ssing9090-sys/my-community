import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ImageUploader from './image-uploader.jsx';
import { POST_CATEGORIES } from '../../utils/site-config.js';

const EMPTY_VALUES = {
  title: '',
  category: POST_CATEGORIES[0],
  rating: null,
  content: '',
  imageUrl: null,
};

/**
 * PostForm 컴포넌트 - 게시물 등록 / 수정 공용 입력 폼
 *
 * Props:
 * @param {object} initialValues - 초기 입력값 { title, category, rating, content, imageUrl } [Optional, 기본값: 빈 값]
 * @param {string} submitLabel - 제출 버튼 문구 [Optional, 기본값: '등록하기']
 * @param {boolean} isSubmitting - 저장 중 여부 [Optional, 기본값: false]
 * @param {function} onSubmit - 제출 시 실행, 인자로 { title, category, rating, content, imageFile, imageUrl } 전달 [Required]
 * @param {function} onCancel - 취소 버튼 클릭 시 실행 [Required]
 *
 * Example usage:
 * <PostForm submitLabel="등록하기" onSubmit={ handleSubmit } onCancel={ handleCancel } />
 */
function PostForm({ initialValues = EMPTY_VALUES, submitLabel = '등록하기', isSubmitting = false, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialValues.title);
  const [category, setCategory] = useState(initialValues.category);
  const [rating, setRating] = useState(initialValues.rating);
  const [content, setContent] = useState(initialValues.content);
  const [imageUrl, setImageUrl] = useState(initialValues.imageUrl);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!title.trim()) nextErrors.title = '제목을 입력해 주세요.';
    if (title.trim().length > 100) nextErrors.title = '제목은 100자 이내로 입력해 주세요.';
    if (!content.trim()) nextErrors.content = '내용을 입력해 주세요.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({ title: title.trim(), category, rating, content: content.trim(), imageFile, imageUrl });
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImageUrl(null);
  };

  return (
    <Box component="form" onSubmit={ handleSubmit } noValidate>
      <Grid container spacing={ 2 }>
        <Grid size={ { xs: 12, md: 4 } }>
          <TextField
            select
            label="카테고리"
            value={ category }
            onChange={ (event) => setCategory(event.target.value) }
            fullWidth
          >
            { POST_CATEGORIES.map((item) => (
              <MenuItem key={ item } value={ item }>{ item }</MenuItem>
            )) }
          </TextField>
        </Grid>
        <Grid size={ { xs: 12, md: 8 } }>
          <TextField
            label="제목"
            value={ title }
            onChange={ (event) => setTitle(event.target.value) }
            error={ Boolean(errors.title) }
            helperText={ errors.title }
            fullWidth
            required
            slotProps={ { htmlInput: { maxLength: 100 } } }
          />
        </Grid>
        <Grid size={ { xs: 12 } }>
          <Box sx={ { display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' } }>
            <Typography variant="body2" color="text.secondary">별점 (선택)</Typography>
            <Rating value={ rating } onChange={ (_event, value) => setRating(value) } />
          </Box>
        </Grid>
        <Grid size={ { xs: 12 } }>
          <TextField
            label="내용"
            value={ content }
            onChange={ (event) => setContent(event.target.value) }
            error={ Boolean(errors.content) }
            helperText={ errors.content ?? '나만의 화장법, 제품 후기, 고민을 자유롭게 나눠 주세요 💄' }
            fullWidth
            required
            multiline
            minRows={ 8 }
          />
        </Grid>
        <Grid size={ { xs: 12 } }>
          <ImageUploader
            imageFile={ imageFile }
            imageUrl={ imageUrl }
            onChange={ setImageFile }
            onRemove={ handleImageRemove }
          />
        </Grid>
        <Grid size={ { xs: 12 } }>
          <Box sx={ { display: 'flex', justifyContent: 'flex-end', gap: 1 } }>
            <Button onClick={ onCancel } color="inherit" disabled={ isSubmitting }>취소</Button>
            <Button type="submit" variant="contained" disabled={ isSubmitting }>
              { isSubmitting ? '저장 중...' : submitLabel }
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PostForm;
