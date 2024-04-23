import AXIOS from '@/lib/axios'
import {
  GetPagenationType,
  DashboardEditMakeParamType,
  InviteDashboardParamType,
  DashboardType,
  EditDahsboardParamType,
} from '@/src/types/mydashboard'

//대시보드 생성
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

//대시보드 목록 조회
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

//대시보드 상세 조회
export const fetchGetDashboardDetail = async (
  dashboardId: number,
): Promise<DashboardType> => {
  const token = localStorage.getItem('accessToken')
  const response = await AXIOS.get(`/dashboards/${dashboardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const { data: dashboard } = response
  return dashboard
}

//대시보드 수정하기
export const fetchPutDashboardEdit = async (
  data: EditDahsboardParamType,
  dashboardId: number,
) => {
  const token = localStorage.getItem('accessToken')
  await AXIOS.put(`/dashboards/${dashboardId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

//대시보드 삭제하기
export const fetchDeleteDashboard = async (id: number) => {
  const token = localStorage.getItem('accessToken')
  await AXIOS.delete(`/dashboards/${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })
}

//대시보드 초대하기
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

//대시보드 초대 불러오기
//fetchGetDashboardMemberList<InvitedMemberType>(1,dashboardId,20) 이런식으로 사용
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

//대시보드 초대 취소
export const fetchDeleteCancelInviteDashboard = async (
  dashboardId: number,
  id: number,
) => {
  const token = localStorage.getItem('accessToken')
  await AXIOS.delete(`/dashboards/${dashboardId}/invitations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
