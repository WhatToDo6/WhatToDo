export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
export const PASSWORD_REGEX = /^(.{1,7})$/

/**
 * 이메일 주소의 유효성을 검사
 *
 * @param {string} email - 입력된 이메일 주소
 * @returns { boolean } - 이메일 주소의 유효성 검사 결과
 */
export function validateEmail(email: string): boolean {
  const isEmailValid = EMAIL_REGEX.test(email)

  return isEmailValid
}

/**
 * 비밀번호의 유효성을 검사
 *
 * @param {string} password
 * @returns {boolean } - 비밀번호의 유효성 검사 결과
 */
export function validatePassword(password: string): boolean {
  if (PASSWORD_REGEX.test(password)) {
    return false
  } else {
    return true
  }
}
