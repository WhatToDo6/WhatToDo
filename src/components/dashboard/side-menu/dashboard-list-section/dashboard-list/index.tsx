import Image from 'next/image'
import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect } from 'react'

import S from './DashboardList.module.scss'
import { CROWN } from '../../constants'

interface DashboardListProps {
  title: string
  color: string
  selected: number
  onSelect: () => void
  createdByMe: boolean
  id: number
  handleChange: (id: number) => void
}

const DashboardList = ({
  title,
  color,
  selected,
  onSelect,
  createdByMe,
  id,
  handleChange,
}: PropsWithChildren<DashboardListProps>) => {
  const {
    query: { id: dashboardId },
  } = useRouter()

  useEffect(() => {
    if (dashboardId) handleChange(+dashboardId)
  }, [])

  return (
    <div
      className={`${S.wrapper} ${selected === id && S.selected}`}
      onClick={onSelect}
    >
      <div className={S.dashboardColor} style={{ backgroundColor: color }} />
      <div className={S.dashboardTitle}>{title}</div>
      {createdByMe && (
        <Image
          className={S.crown}
          src={CROWN}
          width={17}
          height={14}
          alt="왕관"
        />
      )}
    </div>
  )
}

export default DashboardList
