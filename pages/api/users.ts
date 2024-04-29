import AXIOS from '@/lib/axios'

/**
 *
 * @description 회원가입 요청
 * @param {email} string - 이메일
 * @param {nickname} string - 닉네임
 * @param {password} string - 비밀번호
 * @returns accessToken
 */
export const fetchPostUser = async (
  email: string,
  nickname: string,
  password: string,
) => {
  const response = await AXIOS.post('/users', {
    email,
    nickname,
    password,
  })

  return response.status
}

/**
 *
 * @description 내 정보 조회
 * @returns id, email, nickname, profileImageUrl, createdAt, updatedAt
 */
export const fetchGetUser = async () => {
  const token = localStorage.getItem('accessToken')
  const response = await AXIOS.get(`/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const {
    data: { id, email, nickname, profileImageUrl, createdAt, updatedAt },
  } = response
  return { id, email, nickname, profileImageUrl, createdAt, updatedAt }
}
