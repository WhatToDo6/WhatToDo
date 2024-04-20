import AXIOS from '@/lib/axios'
import { TaskCardDataType } from '@/src/types/dashboard.interface'

export async function getTaskCards(
  size = 3,
  columnId: number | undefined,
): Promise<TaskCardDataType[]> {
  try {
    const accessToken = localStorage.getItem('accessToken')
    const query = `size=${size}&columnId=${columnId}`
    const response = await AXIOS.get(`/cards?${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data.cards
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch columns.')
  }
}
