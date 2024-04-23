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

interface InviteeType {
  id: number
  email: string
  nickname: string
}

export interface InviterType extends InviteeType {}

export interface PartialDashboardType {
  id: number
  title: string
}

export interface InvitedListDashboardType {
  createdAt: string
  dashboard: PartialDashboardType
  id: number
  inviteAccepted: boolean | null
  invitee: InviteeType
  inviter: InviterType
  teamId: string
  updatedAt: string
}

export interface InvitedListEmailType extends InvitedListDashboardType {}

export interface InvitedMemberType extends UserType {
  isOwner: boolean
  userId: number
}

export interface GetPagenationType<T> {
  data: T[]
  totalCount: number
}
