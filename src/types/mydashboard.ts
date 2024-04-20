export interface DashboardType {
  id: number
  title: string
  color: string
  userId: number
  createdAt: string
  updatedAt: string
  createdByMe: true
}

export interface UserType {
  createdAt: string
  email: string
  id: number
  nickname: string
  profileImageUrl: string | null
  updatedAt: string
}

export interface InvitedListDashboardType {
  createdAt: string
  dashboard: { id: number; title: string }
  id: number
  inviteAccepted: null
  invitee: { id: number; email: string; nickname: string }
  inviter: { id: number; email: string; nickname: string }
  teamId: string
  updatedAt: string
}
