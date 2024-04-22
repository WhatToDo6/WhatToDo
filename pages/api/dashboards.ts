import AXIOS from '@/lib/axios'
import { GetPagenationType } from '@/src/types/mydashboard'

export const fetchGetDashboards = async <U>(
  page: number,
  visibleDataNum: number,
): Promise<GetPagenationType<U>> => {
  const token = localStorage.getItem('accessToken')
  const response = await AXIOS.get(
    `/dashboards?navigationMethod=pagination&cursorId=1&page=${page}&size=${visibleDataNum}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  const {
    data: { dashboards, totalCount },
  } = response
  return { data: dashboards, totalCount }
}

export const fetchGetInviteeEmails = async <U>(
  page: number,
  dashboardId: number,
  visibleDataNum: number,
): Promise<GetPagenationType<U>> => {
  const token = localStorage.getItem('accessToken')
  const response = await AXIOS.get(
    `/dashboards/${dashboardId}/invitations?&page=${page}&size=${visibleDataNum}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  const {
    data: { invitations, totalCount },
  } = response
  return { data: invitations, totalCount }
}
