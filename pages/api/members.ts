import AXIOS from '@/lib/axios'
import { GetPagenationType } from '@/src/types/mydashboard'

export const fetchGetDashboardMemberList = async <U>(
  page: number,
  dashboardId: number,
  visibleDataNum: number,
): Promise<GetPagenationType<U>> => {
  const token = localStorage.getItem('accessToken')
  const response = await AXIOS.get(
    `/members?page=${page}&size=${visibleDataNum}&dashboardId=${dashboardId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  const {
    data: { members, totalCount },
  } = response
  return { data: members, totalCount }
}
