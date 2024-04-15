import Image from 'next/image'

import S from './DashboardList.module.scss'
import { CROWN } from '../../constants'

const DashboardList = () => {
  return (
    <div className={S.wrapper}>
      <div className={S['dashboard-color']} />
      <div className={S['dashboard-title']}>비브리지</div>
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
