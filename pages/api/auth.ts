import AXIOS from '@/lib/axios'

/**
 *
 * @description 로그인 요청
 * @param {email} string - 이메일
 * @param {password} string - 비밀번호
 * @returns accessToken
 */
export const fetchPostLogin = async (email: string, password: string) => {
  const response = await AXIOS.post('/auth/login', {
    email,
    password,
  })

  return response.data.accessToken
}
