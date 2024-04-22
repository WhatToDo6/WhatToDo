import AXIOS from '@/lib/axios'
import { GetTaskCards } from '@/src/types/dashboard.interface'

export const getTaskCards = async (
  columnId: number,
  cursorId: number | null,
  firstFetch: boolean = false,
): Promise<GetTaskCards> => {
  const token = localStorage.getItem('accessToken')
  const path = `/cards?size=3&columnId=${columnId}${
    !firstFetch && cursorId ? `&cursorId=${cursorId}` : ''
  }`

  const response = await AXIOS.get(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const {
    data: { cards, cursorId: nextCursorId, totalCount },
  } = response

  return { data: cards, nextCursorId, totalCount }
}
