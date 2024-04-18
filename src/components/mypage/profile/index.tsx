import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import AXIOS from '@/lib/axios'
import { InputFormValues } from '@/src/types/input'

import S from './Profile.module.scss'
import BorderButton from '../../common/button/border'
import Input from '../../common/input'

import ADD_IMG from '/public/icons/add-img.svg'

const Profile = () => {
  const [userData, setUserData] = useState('')

  // 이메일 받아오는 부분
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

  // imageUpload시 서버로부터 profileImgURL 받아오는 부분
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormValues>({ mode: 'onSubmit' })

  return (
    <div className={S.container}>
      <h1 className={S.title}>프로필</h1>
      <div className={S.form}>
        <div className={S['img-container']}>
          <label htmlFor="image-upload">
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
              className={S.input}
              onChange={handleImageChange}
            />
          </label>
        </div>
        <form className={S.items} onSubmit={handleSubmit(onSubmit)}>
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
          <div className={S['button-container']}>
            <BorderButton size="small" color="purple" type="submit">
              저장
            </BorderButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
