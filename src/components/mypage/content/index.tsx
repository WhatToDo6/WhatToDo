import { useRouter } from 'next/router'
import Image from 'next/image'

import S from './Content.module.scss'
import Password from '../password'
import Profile from '../profile'
import ImageUpload from '../image-upload'

import LEFT_ARROW from '/public/icons/left-arrow.svg'

const Content = () => {
  const router = useRouter()

  const handleBeforePage = () => {
    router.back()
  }

  return (
    <div className={S.container}>
      <div className={S.before}>
        <div className={S.img} onClick={handleBeforePage}>
          <Image src={LEFT_ARROW} alt="돌아가기" width={20} height={20} />
        </div>
        <h2 className={S.title}>돌아가기</h2>
      </div>
      <Profile />
      <Password />
      <ImageUpload />
    </div>
  )
}

export default Content
