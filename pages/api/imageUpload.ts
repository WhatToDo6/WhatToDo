import AXIOS from '@/lib/axios'

/**
 *
 * @param event
 * @param setUploadedImageUrl - 이미지 업로드 관리할 setState
 * @param columnId - (optional) columnID
 * @returns
 */
export const handleImageChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setUploadedImageUrl: React.Dispatch<React.SetStateAction<string>>,
  columnId?: number,
) => {
  const accessToken = localStorage.getItem('accessToken')
  const files = event.target.files

  const imagePath = columnId
    ? `/columns/${columnId}/card-image`
    : '/users/me/image'

  if (files && files[0] && accessToken) {
    const formData = new FormData()
    formData.append('image', files[0])

    AXIOS.post(imagePath, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (columnId) {
          setUploadedImageUrl(res.data.imageUrl)
        } else {
          setUploadedImageUrl(res.data.profileImageUrl)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
