import Image from 'next/image'

import { ColumnHeaderType } from '@/src/types/dashboard.interface'

import S from './ColumnHeader.module.scss'
import { SETTING } from '../constants'

const ColumnHeader = ({ title, taskCount }: ColumnHeaderType) => {
  return (
    <header className={S.wrapper}>
      <div className={S.columnHeading}>
        <div className={S.ellipse} />
        <div className={S.columnTitle}>{title}</div>
        <div className={S.cardCount}>{taskCount}</div>
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
