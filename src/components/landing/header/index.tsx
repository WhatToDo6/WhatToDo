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
      <p className={S.description}>
        모든 할 일을 한 곳에 등록하고 프로젝트의 진행 상황을 체계적으로
        파악합니다.
        <br />
        다양한 태그를 활용하여 업무를 더욱 효율적으로 분류하며,
        <br />
        댓글을 통한 실시간 소통으로 필요한 순간에 즉각적인 피드백을 주고받을 수
        있습니다.
        <br />
        Taskify와 함께, 더 나은 일정 관리를 지금 바로 시작해보세요!
      </p>
      <BasicButton size="small" onClick={handleGoToLogin}>
        로그인하기
      </BasicButton>
    </header>
  )
}

export default Header
