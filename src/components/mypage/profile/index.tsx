import { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'

import S from './Profile.module.scss'
import BorderButton from '../../common/button/border'
import Input from '../input'

import ADD_IMG from '/public/icons/add-img.svg'

const Profile = () => {
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
          <Input
            label="이메일"
            size="small"
            placeholder="이메일 추가 예정"
            isDisabled={true}
          />
          <Input
            label="닉네임"
            size="small"
            helperText="닉네임을 입력해주세요"
          />
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
