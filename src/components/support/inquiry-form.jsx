import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { useAuth } from '../../hooks/use-auth.js';
import { createInquiry } from '../../utils/community-api.js';
import { isValidEmail } from '../../utils/validators.js';

/**
 * InquiryForm 컴포넌트 - 고객센터 문의사항 작성 폼 (비회원도 작성 가능)
 *
 * Props:
 * @param {function} onSubmitted - 문의 등록 성공 시 실행 [Optional]
 *
 * Example usage:
 * <InquiryForm onSubmitted={ () => setRefreshKey((key) => key + 1) } />
 */
function InquiryForm({ onSubmitted }) {
  const { user, profile } = useAuth();
  const [name, setName] = useState(profile?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ severity: 'success', text: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim() || !title.trim() || !content.trim()) {
      setMessage({ severity: 'error', text: '이름, 제목, 내용을 모두 입력해 주세요.' });
      return;
    }
    if (!isValidEmail(email)) {
      setMessage({ severity: 'error', text: '답변 받을 이메일을 정확히 입력해 주세요.' });
      return;
    }

    setIsSubmitting(true);
    const { error } = await createInquiry({
      user_id: profile?.id ?? null,
      name: name.trim(),
      email: email.trim(),
      title: title.trim(),
      content: content.trim(),
    });
    setIsSubmitting(false);

    if (error) {
      setMessage({ severity: 'error', text: '문의를 등록하지 못했어요. 잠시 후 다시 시도해 주세요.' });
      return;
    }
    setTitle('');
    setContent('');
    setMessage({ severity: 'success', text: '문의가 접수되었어요. 입력하신 이메일로 답변 드릴게요 💌' });
    if (onSubmitted) onSubmitted();
  };

  return (
    <Box component="form" onSubmit={ handleSubmit } noValidate>
      { message.text && <Alert severity={ message.severity } sx={ { mb: 2 } }>{ message.text }</Alert> }
      <Grid container spacing={ 2 }>
        <Grid size={ { xs: 12, md: 6 } }>
          <TextField label="이름" value={ name } onChange={ (event) => setName(event.target.value) } fullWidth required />
        </Grid>
        <Grid size={ { xs: 12, md: 6 } }>
          <TextField label="이메일" type="email" value={ email } onChange={ (event) => setEmail(event.target.value) } fullWidth required />
        </Grid>
        <Grid size={ { xs: 12 } }>
          <TextField label="문의 제목" value={ title } onChange={ (event) => setTitle(event.target.value) } fullWidth required />
        </Grid>
        <Grid size={ { xs: 12 } }>
          <TextField
            label="문의 내용"
            value={ content }
            onChange={ (event) => setContent(event.target.value) }
            fullWidth
            required
            multiline
            minRows={ 5 }
          />
        </Grid>
        <Grid size={ { xs: 12 } }>
          <Box sx={ { display: 'flex', justifyContent: 'flex-end' } }>
            <Button type="submit" variant="contained" color="secondary" disabled={ isSubmitting }>
              { isSubmitting ? '보내는 중...' : '문의 보내기' }
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default InquiryForm;
