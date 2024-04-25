import AXIOS from '@/lib/axios'

const getAuthHeaders = (): Record<string, string> => ({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
})

export const postCardImage = async (
  columnId: number | undefined,
  imageFile: File,
): Promise<string> => {
  const formData = new FormData()
  formData.append('image', imageFile)

  try {
    const response = await AXIOS.post(
      `/columns/${columnId}/card-image`,
      formData,
      { headers: getAuthHeaders() },
    )
    return response.data.imageUrl
  } catch (error) {
    throw new Error('이미지 업로드 중 에러가 발생했습니다.')
  }
}
