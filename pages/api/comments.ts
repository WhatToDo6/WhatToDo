import AXIOS from '@/lib/axios'
import { CommentsType } from '@/src/types/dashboard.interface'

const getAuthHeaders = (): Record<string, string> => ({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  'Content-Type': 'application/json',
})

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
    console.error(`API 호출 에러 (${method} ${url}):`, error)
    throw new Error('API 처리 중 에러가 발생했습니다.')
  }
}

export const getComments = async (
  cardId: number,
  cursorId: number | null,
  firstFetch: boolean = false,
): Promise<any> => {
  //임시 타입
  const path = `/comments?size=3&cardId=${cardId}${!firstFetch && cursorId ? `&cursorId=${cursorId}` : ''}`
  const response = await apiCall('get', path)
  return {
    data: response.comments,
    nextCursorId: response.cursorId,
  }
}

export const putComments = async (
  id: number | undefined,
  data: { content: string },
): Promise<CommentsType[]> => {
  if (!id) throw new Error('댓글 ID가 필요합니다.')
  return await apiCall('put', `/comments/${id}`, data)
}

export const deleteComment = async (
  id: number | undefined,
): Promise<CommentsType[]> => {
  if (!id) throw new Error('댓글 ID가 필요합니다.')
  return await apiCall('delete', `/comments/${id}`)
}

export const postComments = async (
  content: string,
  cardId: number,
  columnId: number | undefined,
  dashboardId: number,
): Promise<CommentsType> => {
  const fullData = {
    content: content,
    cardId: cardId,
    columnId: columnId,
    dashboardId: dashboardId,
  }
  return await apiCall('post', `/comments`, fullData)
}
