import AXIOS from '@/lib/axios'
import { ColumnDataType } from '@/src/types/dashboard.interface'

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
 * @param {boolean} unwrapData - 응답에서 data, data.data를 사용할지 여부
 * @returns {Promise<any>} 서버로부터의 응답 데이터
 */
const apiCall = async (
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: Record<string, any>,
  unwrapData: boolean = true,
): Promise<any> => {
  try {
    const options = {
      method,
      url,
      headers: getAuthHeaders(),
      data,
    }
    const response = await AXIOS(options)
    return unwrapData ? response.data.data : response.data
  } catch (error) {
    console.error(`API 호출 에러 (${method} ${url}):`, error)
    throw new Error('API 처리 중 에러가 발생했습니다.')
  }
}

/**
 * 지정된 대시보드 ID에 대한 칼럼 요청
 * @param {number | undefined} id - 대시보드 ID
 * @returns {Promise<ColumnDataType[]>} 칼럼 데이터 배열
 */
export const getColumns = async (
  id: number | undefined,
): Promise<ColumnDataType[]> => {
  if (!id) throw new Error('칼럼 ID가 필요합니다.')
  return await apiCall('get', `/columns?dashboardId=${id}`)
}

/**
 * 지정된 ID의 칼럼을 업데이트
 * @param {number | undefined} id - 칼럼 ID
 * @param {{ title: string }} data - 수정할 데이터 객체
 * @returns {Promise<ColumnDataType[]>} 수정된 칼럼 데이터
 */
export const putColumns = async (
  id: number | undefined,
  data: { title: string | undefined },
): Promise<ColumnDataType[]> => {
  if (!id) throw new Error('칼럼 ID가 필요합니다.')
  return await apiCall('put', `/columns/${id}`, data)
}

/**
 * 지정된 ID의 칼럼을 삭제
 * @param {number | undefined} id - 칼럼 ID
 * @returns {Promise<ColumnDataType[]>} 삭제 후의 칼럼 데이터
 */
export const deleteColumns = async (
  id: number | undefined,
): Promise<ColumnDataType[]> => {
  if (!id) throw new Error('칼럼 ID가 필요합니다.')
  return await apiCall('delete', `/columns/${id}`)
}

/**
 * 새로운 칼럼을 생성
 * @param {{ title: string | undefined }} data - 생성할 칼럼의 데이터
 * @param {number | undefined} dashboardId - 대시보드 ID
 * @returns {Promise<ColumnDataType>} 생성된 칼럼 데이터
 */
export const postColumns = async (
  data: { title: string | undefined },
  dashboardId: number | undefined,
): Promise<ColumnDataType> => {
  const fullData = {
    ...data,
    dashboardId: dashboardId,
  }
  return await apiCall('post', `/columns`, fullData, false)
}
