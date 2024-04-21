import Image from 'next/image'
import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'

import ADD_IMG from '@/public/icons/add-img.svg'
import { InputFormValues } from '@/src/types/input'

import S from './ImageUpload.module.scss'

interface InputImageUploadProps {
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void
  isSmall?: boolean
}

const InputImageUpload = ({
  handleImageChange,
  isSmall = false,
}: InputImageUploadProps) => {
  const { register } = useForm<InputFormValues>()

  return (
    <div className={`${S.container} ${isSmall && S.small}`}>
      <label htmlFor="profileImageUpload">
        <Image
          className={`${S.img} ${isSmall && S.smallImg}`}
          src={ADD_IMG}
          alt="Upload image icon"
          width={30}
          height={30}
        />
      </label>
      <input
        id="profileImageUpload"
        type="file"
        {...register('profileImageUrl')}
        onChange={handleImageChange}
        className={S.input}
      />
    </div>
  )
}

export default InputImageUpload
