import AXIOS from '@/lib/axios'
import {
  GetPagenationType,
  DashboardEditMakeParamType,
  InviteDashboardParamType,
} from '@/src/types/mydashboard'

export const fetchGetDashboardList = async <U>(
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

export const fetchGetInviteeEmailList = async <U>(
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

export const fetchPostMakeDashboard = async (
  data: DashboardEditMakeParamType,
) => {
  const token = localStorage.getItem('accessToken')
  await AXIOS.post('/dashboards', data, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
}

export const fetchPostInviteDashboard = async (
  data: InviteDashboardParamType,
  dashboardId: number,
) => {
  const token = localStorage.getItem('accessToken')
  await AXIOS.post(`/dashboards/${dashboardId}/invitations`, data, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
}
