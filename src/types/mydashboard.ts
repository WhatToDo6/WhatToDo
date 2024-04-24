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

export interface InviteeType {
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
//이름변경하기, 수정하기
export interface GetPagenationType<T> {
  data: T[]
  totalCount: number
  cursorId?: number
}

export interface GetInfiniteDashboardListType {
  data: DashboardType[]
  cursorId: number
}

export interface DashboardEditMakeParamType {
  title: string
  color: string
}

export interface InviteDashboardParamType {
  email: string
}

//없애기
export interface EditDahsboardParamType {
  title: string
  color: string
}

export interface GetInivtedDashboardListParamType {
  invitations: InvitedListDashboardType[]
  cursorId: number
}

export interface PaginationContextType<T> {
  pageData: T[]
  currPage: number
  lastPage: number
  onClickPrevPage: () => void
  onClickNextPage: () => void
  updateData: (page: number) => void
}
