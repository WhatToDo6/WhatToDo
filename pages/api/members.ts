import AXIOS from '@/lib/axios'
import { GetPagenationType } from '@/src/types/mydashboard'

// 대시보드 멤버 목록 조회
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
