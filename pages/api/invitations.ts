import AXIOS from '@/lib/axios'
import { GetInivtedDashboardListParamType } from '@/src/types/mydashboard'

//내가 받은 초대 목록 조회
export const fetchGetInvitedDashboardList = async (
  path: string,
): Promise<GetInivtedDashboardListParamType> => {
  const token = localStorage.getItem('accessToken')
  const response = await AXIOS.get(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const {
    data: { invitations, cursorId },
  } = response
  return { invitations, cursorId }
}

//초대 응답
export const fetchPutAnswerInvitation = async (id: number, answer: boolean) => {
  const token = localStorage.getItem('accessToken')
  await AXIOS.put(
    `/invitations/${id}`,
    {
      inviteAccepted: answer,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
