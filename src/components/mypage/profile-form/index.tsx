import Image from 'next/image'
import { useState, ChangeEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import AXIOS from '@/lib/axios'
import { useUserData } from '@/src/hooks/useUserData'
import { InputFormValues } from '@/src/types/input'

import S from './ProfileForm.module.scss'
import BorderButton from '../../common/button/border'

import ADD_IMG from '/public/icons/add-img.svg'

import Input from '../../common/input'

const ProfileForm = () => {
  const userData = useUserData()
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const accessToken = localStorage.getItem('accessToken')
    const files = event.target.files
    if (files && files[0] && accessToken) {
      const formData = new FormData()
      formData.append('image', files[0])

      AXIOS.post('/users/me/image', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          setUploadedImageUrl(res.data.profileImageUrl)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  const onSubmit: SubmitHandler<InputFormValues> = (data) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      AXIOS.put(
        '/users/me',
        {
          nickname: data.newNickname ? data.newNickname : userData?.nickname,
          profileImageUrl: uploadedImageUrl
            ? uploadedImageUrl
            : userData?.profileImageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ).catch((err) => {
        console.error(err.response.data.message)
      })
    }
    reset({
      nickname: '',
      profileImageUrl: undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={S.container}>
      <div className={S.content}>
        <div className={S['img-container']}>
          <label htmlFor="profileImageUpload" className={S.img}>
            <Image src={ADD_IMG} alt="" width={30} height={30} />
          </label>
          <input
            id="profileImageUpload"
            type="file"
            {...register('profileImageUrl')}
            onChange={handleImageChange}
            className={S['img-input']}
          />
        </div>
        <div className={S['text-container']}>
          <label className={S.title}>이메일</label>
          <input
            type="text"
            disabled={true}
            placeholder={userData?.email}
            className={`${S['text-input']} ${S['first-input']}`}
          />
          <label className={S.title}>닉네임</label>
          <Input
            inputType="newNickname"
            placeholder=""
            error={errors.newNickname}
            register={register}
            currentNickname={userData?.nickname}
            size="small"
          />
        </div>
      </div>
      <div className={S.button}>
        <BorderButton size="small" color="purple">
          저장
        </BorderButton>
      </div>
    </form>
  )
}

export default ProfileForm
