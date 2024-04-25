import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import AXIOS from '@/lib/axios'
import { handleImageChange } from '@/pages/api/imageUpload'
import BorderButton from '@/src/components/common/button/border'
import Input from '@/src/components/common/input'
import { useToast } from '@/src/context/toast'
import { useUser } from '@/src/context/users'
import { InputFormValues } from '@/src/types/input'

import S from './ProfileForm.module.scss'
import InputProfileImage from '../../common/input/profile-image'

interface ProfileUpdateProps {
  nickname?: string
  profileImageUrl?: string
}

const ProfileForm = () => {
  const { userData, setUserData } = useUser()
  const { addToast } = useToast()
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')

  useEffect(() => {
    setUploadedImageUrl(userData?.profileImageUrl ?? '')
  }, [userData?.profileImageUrl])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<InputFormValues> = (data) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      const changes: ProfileUpdateProps = {}
      if (data.newNickname && data.newNickname !== userData?.nickname) {
        changes.nickname = data.newNickname
      }
      if (uploadedImageUrl !== userData?.profileImageUrl) {
        changes.profileImageUrl = uploadedImageUrl
      }

      if (Object.keys(changes).length > 0) {
        AXIOS.put('/users/me', changes, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((res) => {
            setUserData((prevUserData) => {
              if (prevUserData === null) return null
              return {
                ...prevUserData,
                profileImageUrl: res.data.profileImageUrl,
                nickname: res.data.nickname,
              }
            })
            addToast('프로필이 성공적으로 업데이트 되었습니다.', 'success')
          })
          .catch((err) => {
            console.error(err.response.data.message)
          })
      }
    }
    reset({
      nickname: '',
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={S.container}>
      <div className={S.content}>
        <div className={S.imgContainer}>
          <InputProfileImage
            profileImageUrl=""
            handleImageChange={(event) =>
              handleImageChange(event, setUploadedImageUrl)
            }
          />
        </div>
        <div className={S.textContainer}>
          <label className={S.title}>이메일</label>
          <input
            type="text"
            disabled={true}
            placeholder={userData?.email}
            className={S.textInput}
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
