// UserContext 설정 예시
import { createContext, useContext, useState, useEffect } from 'react'

import AXIOS from '@/lib/axios'
import { ChildrenProps } from '@/src/types/commonType'
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

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        const response = await AXIOS.get('/users/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        setUserData(response.data)
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
