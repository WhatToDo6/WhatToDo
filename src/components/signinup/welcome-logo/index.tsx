import Image from 'next/image'
import { useRouter } from 'next/router'

import LOGO_IMAGE from '@/public/images/logo-img.png'
import LOGO_TEXT from '@/public/images/logo-text.svg'

import S from './WelcomLogo.module.scss'

type Path = '/signin' | '/signup'

const WELCOME_TEXT: Record<Path, string> = {
  '/signin': '오늘도 만나서 반가워요!',
  '/signup': '첫 방문을 환영합니다!',
}

const WelcomeLogo = () => {
  const router = useRouter()
  const currPath = router.asPath as Path

  return (
    <div className={S.container}>
      <div className={S.logo}>
        <div className={S.img}>
          <Image src={LOGO_IMAGE} alt="로고 이미지" fill objectFit="cover" />
        </div>
        <div className={S.text}>
          <Image src={LOGO_TEXT} alt="로고 글자" fill objectFit="cover" />
        </div>
      </div>
      <span className={S.span}>{WELCOME_TEXT[currPath]}</span>
    </div>
  )
}

export default WelcomeLogo
