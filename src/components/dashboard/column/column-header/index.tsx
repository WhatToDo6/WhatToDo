import Image from 'next/image'

import S from './ColumnHeader.module.scss'
import { SETTING } from '../constants'

const ColumnHeader = () => {
  return (
    <header className={S.wrapper}>
      <div className={S.columnHeading}>
        <div className={S.ellipse} />
        <div className={S.columnTitle}>To do</div>
        <div className={S.cardCount}>3</div>
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
