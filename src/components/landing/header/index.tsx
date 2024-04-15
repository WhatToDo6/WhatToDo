import Image from 'next/image'

import S from './Header.module.scss'

import HEADER_IMG from '/public/images/headerImg.png'

const Header = () => {
  return (
    <header className={S.container}>
      <Image src={HEADER_IMG} alt="taskify 이미지" width={722} height={422} />
      <h1 className={S.title}>
        새로운 일정 관리 <span>Taskify</span>
      </h1>
      <p className={S.description}>서비스의 메인 설명 들어갑니다.</p>
      {/* 버튼 추가할 예정  */}
    </header>
  )
}

export default Header
