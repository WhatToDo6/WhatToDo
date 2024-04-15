import Image from 'next/image'
import { useState } from 'react'

import S from './DashboardList.module.scss'
import { CROWN } from '../../constants'

interface DashboardListProps {
  title: string
  isSelected: boolean
}

const DashboardList: React.FC<DashboardListProps> = ({ title, isSelected }) => {
  const [selected, setSelected] = useState(isSelected)

  return (
    <div className={S.wrapper}>
      <div className={S['dashboard-color']} />
      <div className={S['dashboard-title']}>{title}</div>
      <Image
        className={S.crown}
        src={CROWN}
        width={17}
        height={14}
        alt="왕관"
      />
    </div>
  )
}

export default DashboardList
