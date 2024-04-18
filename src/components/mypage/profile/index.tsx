import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

import { InputFormValues } from '@/src/types/input'

import S from './Profile.module.scss'
import BorderButton from '../../common/button/border'
import Input from '../../common/input'

import AXIOS from '@/lib/axios'

import ADD_IMG from '/public/icons/add-img.svg'

const Profile = () => {
  const [userData, setUserData] = useState('')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      setSelectedImage(URL.createObjectURL(img))
    }
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      AXIOS.get('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          setUserData(res.data.email)
        })
        .catch((err) => {
          console.error('Error fetching user data:', err.response.data.message)
        })
    }
  }, [])

  const {
    register,
    formState: { errors },
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  return (
    <div className={S.container}>
      <h1 className={S.title}>프로필</h1>
      <div className={S.items}>
        <div className={S['img-container']} onClick={handleImageUpload}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={S.input}
          />
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="선택된 이미지"
              fill
              unoptimized={true}
              className={S['preview-image']}
            />
          ) : (
            <Image src={ADD_IMG} alt="이미지 추가하기" width={30} height={30} />
          )}
        </div>
        <form className={S.form}>
          <div className={S.item}>
            <label className={S.label}>이메일</label>
            <Input
              inputType="title"
              placeholder={userData}
              error={errors.email}
              register={register}
              size="small"
              disabled={true}
            />
          </div>
          <div className={S.item}>
            <label className={S.label}>닉네임</label>
            <Input
              inputType="nickname"
              placeholder=""
              error={errors.nickname}
              register={register}
              size="small"
              required={false}
            />
          </div>
        </form>
      </div>
      <div className={S['button-container']}>
        <BorderButton size="small" color="purple">
          저장
        </BorderButton>
      </div>
    </div>
  )
}

export default Profile
