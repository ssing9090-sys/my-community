/**
 * 이메일 형식 검사
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * 휴대전화 번호 형식 검사 (010-1234-5678 / 01012345678)
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  return /^01[0-9]-?\d{3,4}-?\d{4}$/.test(phone);
}
