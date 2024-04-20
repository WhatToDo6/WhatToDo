import Image from 'next/image'

import S from './ColumnHeader.module.scss'
import { SETTING } from '../constants'

//TODO: columnTitle 데이터
//TODO: cardCount 데이터
//TODO: setting 기능

type titleType = {
  title: string
}

const ColumnHeader = ({ title }: titleType) => {
  return (
    <header className={S.wrapper}>
      <div className={S.columnHeading}>
        <div className={S.ellipse} />
        <div className={S.columnTitle}>{title}</div>
        <div className={S.cardCount}>1</div>
      </div>
      <Image
        className={S.setting}
        src={SETTING}
        width={24}
        height={24}
        alt="설정"
      />
    </header>
  )
}

export default ColumnHeader
