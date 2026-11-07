const STORAGE_KEY = 'color-diagnosis-history';
const MAX_HISTORY = 10;

/** 저장된 진단 기록 읽기. 저장소를 쓸 수 없으면 빈 목록을 돌려준다 */
export function loadHistory() {
  try {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(history) ? history : [];
  } catch {
    return [];
  }
}

/** 진단 기록 저장. 저장에 실패해도 화면은 그대로 동작한다 */
export function saveHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  } catch {
    /* 사생활 보호 모드 등에서는 기록만 남지 않는다 */
  }
}
