// apiService.js
import AXIOS from '@/lib/axios'
import { GetTaskCards } from '@/src/types/dashboard.interface'

/**
 * API 요청에 사용될 공통 인증 헤더 반환
 * @returns {Record<string, string>} 인증 헤더 객체
 */
const getAuthHeaders = (): Record<string, string> => ({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  'Content-Type': 'application/json',
})

/**
 * 일반적인 API 호출을 수행하는 함수
 * @param { 'get' | 'post' | 'put' | 'delete'} method - 사용할 HTTP 메소드
 * @param {string} url - 요청할 URL
 * @param {Record<string, any> | undefined} data - 요청에 포함될 데이터
 * @returns {Promise<any>} 서버로부터의 응답 데이터
 */
const apiCall = async (
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: Record<string, any>,
): Promise<any> => {
  try {
    const options = {
      method,
      url,
      headers: getAuthHeaders(),
      data,
    }
    const response = await AXIOS(options)
    return response.data
  } catch (error) {
    if (error.response) {
      // 서버에서 반환된 에러 정보를 문자열로 변환하여 출력
      console.error(
        `Server responded with a ${error.response.status}:`,
        JSON.stringify(error.response.data, null, 2),
      )
    } else if (error.request) {
      // 요청이 서버에 전송됐으나 응답을 받지 못한 경우
      console.error('Request was sent but no response was received')
    } else {
      // 요청 설정 과정에서 문제 발생
      console.error('Error setting up the request:', error.message)
    }
    throw new Error('API 처리 중 에러가 발생했습니다.')
  }
}

/**
 * 칼럼 ID와 옵션으로 cursorId를 사용하여 작업 카드를 가져오는 함수
 * @param {number} columnId - 칼럼 ID
 * @param {number | null} cursorId - 페이징 처리를 위한 커서 ID
 * @param {boolean} firstFetch - 처음 데이터를 가져올지 여부
 * @returns {Promise<GetTaskCards>} 작업 카드 데이터
 */
export const getTaskCards = async (
  columnId: number,
  cursorId: number | null,
  firstFetch: boolean = false,
): Promise<GetTaskCards> => {
  const path = `/cards?size=3&columnId=${columnId}${!firstFetch && cursorId ? `&cursorId=${cursorId}` : ''}`
  const response = await apiCall('get', path)
  return {
    data: response.cards,
    nextCursorId: response.cursorId,
    totalCount: response.totalCount,
  }
}

/**
 * 새로운 카드를 생성하는 함수
 * @param {number} assigneeUserId - 담당자 사용자 ID
 * @param {number} dashboardId - 대시보드 ID
 * @param {number} columnId - 칼럼 ID
 * @param {string} title - 카드 제목
 * @param {string} description - 카드 설명
 * @param {string} dueDate - 마감일
 * @param {string[]} tags - 태그 배열
 * @param {string} imageUrl - 이미지 URL
 * @returns {Promise<any>} 서버로부터의 응답 데이터
 */
export const postTaskCards = async ({
  assigneeUserId,
  dashboardId,
  columnId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
}: {
  assigneeUserId: number
  dashboardId: number
  columnId: number
  title: string
  description: string
  dueDate: string
  tags: string[]
  imageUrl: string
}): Promise<any> => {
  const url = 'https://sp-taskify-api.vercel.app/4-6/cards'
  const data = {
    assigneeUserId,
    dashboardId,
    columnId,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  }
  return await apiCall('post', url, data)
}
