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

