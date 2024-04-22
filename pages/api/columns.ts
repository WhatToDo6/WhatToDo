import AXIOS from '@/lib/axios'
import { ColumnDataType } from '@/src/types/dashboard.interface'

export async function getColumns(
  id: number | undefined,
): Promise<ColumnDataType[]> {
  if (!id) {
    throw new Error('Dashboard ID is required')
  }
  try {
    const accessToken = localStorage.getItem('accessToken')
    const response = await AXIOS.get(`/columns?dashboardId=${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data.data
  } catch (error) {
    throw new Error('Failed to fetch columns.')
  }
}
