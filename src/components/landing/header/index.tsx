import Image from 'next/image'
import { useRouter } from 'next/router'

import HEADER_IMG from '@/public/images/header-img.png'
import BasicButton from '@/src/components/common/button/basic'

import S from './Header.module.scss'

const Header = () => {
  const router = useRouter()

  const handleGoToLogin = () => {
    router.push('/login')
  }

  return (
    <header className={S.container}>
      <Image
        className={S.img}
        src={HEADER_IMG}
        alt="taskify 이미지"
        width={722}
        height={422}
      />
      <h1 className={S.title}>
        새로운 일정 관리<span>Taskify</span>
      </h1>
      <p className={S.description}>서비스의 메인 설명 들어갑니다.</p>
      <BasicButton size="small" onClick={handleGoToLogin}>
        로그인하기
      </BasicButton>
    </header>
  )
}

export default Header
