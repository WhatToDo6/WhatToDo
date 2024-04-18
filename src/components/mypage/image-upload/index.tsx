import Image from 'next/image'
import { ChangeEvent } from 'react'

import AXIOS from '@/lib/axios'

import S from './ImageUpload.module.scss'

import ADD_IMG from '/public/icons/add-img.svg'

const ImageUpload = () => {
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      await uploadFile(file)
    }
  }

  const uploadFile = async (file: File) => {
    const accessToken = localStorage.getItem('accessToken')
    const formData = new FormData()
    formData.append('image', file)

    if (accessToken) {
      AXIOS.post('/users/me/image', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        console.log(res.data.profileImageUrl)
      })
    }
  }

  return (
    <div className={S.container}>
      <label htmlFor="image-upload" className={S.label}>
        <Image
          src={ADD_IMG}
          alt="이미지 추가하기"
          width={30}
          height={30}
          className={S.img}
        />
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </label>
    </div>
  )
}

export default ImageUpload
