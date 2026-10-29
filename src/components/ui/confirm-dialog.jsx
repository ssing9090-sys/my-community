import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/**
 * ConfirmDialog 컴포넌트 - 삭제 등 되돌릴 수 없는 작업 전 확인창
 *
 * Props:
 * @param {boolean} isOpen - 확인창 표시 여부 [Required]
 * @param {string} title - 확인창 제목 [Required]
 * @param {string} message - 안내 문구 [Required]
 * @param {string} confirmLabel - 확인 버튼 문구 [Optional, 기본값: '삭제']
 * @param {boolean} isLoading - 처리 중 여부 [Optional, 기본값: false]
 * @param {function} onConfirm - 확인 버튼 클릭 시 실행 [Required]
 * @param {function} onClose - 취소 / 닫기 시 실행 [Required]
 *
 * Example usage:
 * <ConfirmDialog isOpen={ isOpen } title="삭제" message="삭제할까요?" onConfirm={ handleDelete } onClose={ handleClose } />
 */
function ConfirmDialog({ isOpen, title, message, confirmLabel = '삭제', isLoading = false, onConfirm, onClose }) {
  return (
    <Dialog open={ isOpen } onClose={ isLoading ? undefined : onClose } fullWidth maxWidth="xs">
      <DialogTitle>{ title }</DialogTitle>
      <DialogContent>
        <DialogContentText>{ message }</DialogContentText>
      </DialogContent>
      <DialogActions sx={ { px: 3, pb: 2 } }>
        <Button onClick={ onClose } disabled={ isLoading } color="inherit">취소</Button>
        <Button onClick={ onConfirm } disabled={ isLoading } variant="contained" color="error">
          { confirmLabel }
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
