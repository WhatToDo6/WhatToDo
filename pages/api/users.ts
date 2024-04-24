import AXIOS from '@/lib/axios'

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
