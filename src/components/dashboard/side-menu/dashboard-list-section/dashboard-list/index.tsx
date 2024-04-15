import Image from 'next/image'

import S from './DashboardList.module.scss'
import { CROWN } from '../../constants'

interface DashboardListProps {
  title: string
  color: string
  selected: string
  onSelect: () => void
}

const DashboardList: React.FC<DashboardListProps> = ({
  title,
  color,
  selected,
  onSelect,
}) => {
  return (
    <div
      className={`${S.wrapper} ${selected === title && S.selected}`}
      onClick={onSelect}
    >
      <div
        className={S['dashboard-color']}
        style={{ backgroundColor: color }}
      />
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
