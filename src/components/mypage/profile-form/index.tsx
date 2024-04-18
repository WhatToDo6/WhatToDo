import Image from 'next/image'
import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import AXIOS from '@/lib/axios'

import S from './ProfileForm.module.scss'
import BorderButton from '../../common/button/border'

import ADD_IMG from '/public/icons/add-img.svg'

type FormValues = {
  nickname: string
  profileImageUrl: FileList
}

const ProfileForm = () => {
  const [userEmail, setUserEmail] = useState('')
  const [userNickname, setUserNickname] = useState('')
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' })

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      AXIOS.get('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          setUserEmail(res.data.email)
          setUserNickname(res.data.nickname)
          setUploadedImageUrl(res.data.profileImageUrl)
        })
        .catch((err) => {
          console.error('Error fetching user data:', err.response.data.message)
        })
    }
  }, []) //초기 유저 정보를 가져온다.

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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      AXIOS.put(
        '/users/me',
        {
          nickname: data.nickname ? data.nickname : userNickname,
          profileImageUrl: uploadedImageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
        .then((res) => {
          setUserNickname(res.data.nickname)
        })
        .catch((err) => {
          console.error(err.response.data.message)
        })
    }
    reset({
      nickname: '',
      profileImageUrl: undefined,
    })
  } // 저장 누르면 실헹되는 부분

  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    inputFileRef.current?.click()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={S.container}>
      <div className={S.content}>
        <div className={S['img-container']} onClick={handleImageClick}>
          <Image
            src={ADD_IMG}
            alt=""
            width={30}
            height={30}
            className={S.img}
          />
          <input
            type="file"
            {...register('profileImageUrl')}
            ref={inputFileRef}
            className={S['img-input']}
            onChange={handleImageChange}
          />
        </div>
        <div className={S['text-container']}>
          <label className={S.title}>이메일</label>
          <input
            type="text"
            disabled={true}
            placeholder={userEmail}
            className={`${S['text-input']} ${S['first-input']}`}
          />
          <label className={S.title}>닉네임</label>
          <input
            type="text"
            {...register('nickname', {
              validate: (value) =>
                value.length <= 10 || '10자 이하로 작성해주세요.',
            })}
            className={`${S['text-input']} ${errors.nickname ? S.error : ''}`}
          />
          <span className={S.errormessage}>{errors.nickname?.message}</span>
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
