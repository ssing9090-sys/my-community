/**
 * 날짜를 'YYYY. MM. DD. HH:mm' 형태로 변환한다.
 * @param {string} value - ISO 날짜 문자열
 * @returns {string}
 */
export function formatDateTime(value) {
  return new Date(value).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * 날짜를 '방금 전', 'n분 전' 같은 상대 시간으로 변환한다.
 * @param {string} value - ISO 날짜 문자열
 * @returns {string}
 */
export function formatRelativeTime(value) {
  const diffMinutes = Math.floor((Date.now() - new Date(value).getTime()) / 60000);

  if (diffMinutes < 1) return '방금 전';
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffMinutes < 60 * 24) return `${Math.floor(diffMinutes / 60)}시간 전`;
  if (diffMinutes < 60 * 24 * 7) return `${Math.floor(diffMinutes / (60 * 24))}일 전`;
  return new Date(value).toLocaleDateString('ko-KR');
}
