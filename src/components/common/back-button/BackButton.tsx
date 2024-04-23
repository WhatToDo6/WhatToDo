import Image from 'next/image'
import { useRouter } from 'next/router'

import LEFT_ARROW from '@/public/icons/left-arrow.svg'

import S from './BackButton.module.scss'

function BackButton() {
  const router = useRouter()

  const handleBeforePage = () => {
    router.back()
  }
  return (
    <div className={S.before} onClick={handleBeforePage}>
      <div className={S.img}>
        <Image src={LEFT_ARROW} alt="돌아가기" width={20} height={20} />
      </div>
      <h2 className={S.title}>돌아가기</h2>
    </div>
  )
}

export default BackButton
