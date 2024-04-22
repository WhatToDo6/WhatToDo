import { useState, useEffect } from 'react'

import AXIOS from '@/lib/axios'

type UserData = {
  email: string
  nickname: string
  profileImageUrl: string
}

export function useUserData() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      AXIOS.get('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          setUserData(res.data)
        })
        .catch((err) => {
          console.error('Error fetching user data:', err.response.data.message)
        })
    }
  }, [])

  const { email, nickname, profileImageUrl } = userData || {
    email: '',
    nickname: '',
    profileImageUrl: '',
  }

  return { email, nickname, profileImageUrl }
}
