import Image from 'next/image'

import S from './Content.module.scss'
import Password from '../password'
import Profile from '../profile'

import ARROW_ICON from '/public/icons/arrow-icon.svg'

const Content = () => {
  return (
    <div className={S.container}>
      <div className={S.before}>
        <Image
          src={ARROW_ICON}
          alt="돌아가기"
          width={20}
          height={20}
          className={S.img}
        />
        <h2 className={S.title}>돌아가기</h2>
      </div>
      <Profile />
      <Password />
    </div>
  )
}

export default Content
