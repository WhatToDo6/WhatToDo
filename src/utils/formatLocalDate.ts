/**
 *
 * @description 날짜 문자열을 Date 객체로 변환
 * @param {string} date - 날짜 문자열 2024-04-27 00:00
 * @returns {object} Sat Apr 27 2024 00:00:00 GMT+0900 (한국 표준시) 형식
 */
export const formatLocalDate = (date: string): object => {
  const [datePart, timePart] = date.split(' ')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hour, minute] = timePart.split(':').map(Number)

  const localDate = new Date(year, month - 1, day, hour, minute)

  return localDate
}
