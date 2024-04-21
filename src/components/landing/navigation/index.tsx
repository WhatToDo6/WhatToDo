import Image from 'next/image'
import Link from 'next/link'

import LOGO_IMG from '@/public/icons/white-logo-img.svg'
import LOGO_TEXT_IMG from '@/public/icons/white-logo-text.svg'

import S from './Navigaiton.module.scss'

const Navigation = () => {
  return (
    <nav className={S.container}>
      <Link href="/">
        <Image src={LOGO_IMG} alt="로고" width={28} height={33} />
        <Image src={LOGO_TEXT_IMG} alt="Taskify" width={80} height={22} />
      </Link>

      <div className={S.cta}>
        <Link href="/login">
          <span className={S.ctaText}>로그인</span>
        </Link>
        <Link href="/signup">
          <span className={S.ctaText}>회원가입</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
