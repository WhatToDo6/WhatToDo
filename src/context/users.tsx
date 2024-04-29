import { useRouter } from 'next/router'
import { createContext, useContext, useState, useEffect } from 'react'

import { fetchGetUser } from '@/pages/api/users'
import { ChildrenProps } from '@/src/types/common'
import { UserType } from '@/src/types/mydashboard'

interface UserContextValue {
  userData: UserType | null
  setUserData: React.Dispatch<React.SetStateAction<UserType | null>>
}

const UserContext = createContext<UserContextValue>({
  userData: null,
  setUserData: () => {},
})

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }: ChildrenProps) => {
  const [userData, setUserData] = useState<UserType | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await fetchGetUser()
        setUserData(user)
      } catch (error) {
        console.error('유저의 정보를 불러오지 못했습니다.', error)
        router.replace('/')
      }
    }

    fetchUserData()
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
