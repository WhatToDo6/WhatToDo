import AXIOS from '@/lib/axios'
import {
  ColumnDataType,
  ColumnTitleType,
} from '@/src/types/dashboard.interface'

export async function getColumns(
  id: number | undefined,
): Promise<ColumnDataType[]> {
  if (!id) {
    throw new Error('칼럼id가 필요합니다.')
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
    throw new Error('칼럼 데이터를 불러오는 데 실패했습니다.')
  }
}

export async function putColumns(
  id: number | undefined,
  data: ColumnTitleType,
): Promise<ColumnDataType[]> {
  if (!id) {
    throw new Error('칼럼id가 필요합니다.')
  }
  try {
    const accessToken = localStorage.getItem('accessToken')
    const response = await AXIOS.put(`/columns/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data.data
  } catch (error) {
    throw new Error('칼럼 데이터를 수정하는 데 실패했습니다.')
  }
}
