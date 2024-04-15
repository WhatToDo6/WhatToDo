import { useRouter } from 'next/router'

import S from './ChagePage.module.scss'
import { SignPath } from '../welcome-logo'

const ChangePage = () => {
  const router = useRouter()
  const currPath = router.pathname as SignPath

  const TEXT_MAP = {
    '/login': (
      <div className={S.container}>
        <span className={S.black}>회원이 아니신가요?</span>
        <span className={S.violet} onClick={() => router.push('/signup')}>
          회원가입하기
        </span>
      </div>
    ),
    '/signup': (
      <div className={S.container}>
        <span className={S.black}>이미 가입하셨나요?</span>
        <span className={S.violet} onClick={() => router.push('/login')}>
          로그인하기
        </span>
      </div>
    ),
  }

  return TEXT_MAP[currPath]
}

export default ChangePage
