import Image from 'next/image'
import Link from 'next/link'

import { ROUTE } from '@/src/constants/route'

import { LOGO_IMAGE, LOGO_TEXT } from './constants'
import DashboardList from './DashboardList'
import S from './SideMenu.module.scss'

const SideMenu = () => {
  return (
    <div className={S.container}>
      <div className={S['logo-wrapper']}>
        <Link href={ROUTE.landing}>
          <h1>
            <Image src={LOGO_IMAGE} width={28} height={33} alt="Taskyfy 로고" />
            <Image
              className={S['logo-text']}
              src={LOGO_TEXT}
              width={80}
              height={22}
              alt="Taskyfy"
            />
          </h1>
        </Link>
      </div>
      <DashboardList />
    </div>
  )
}

export default SideMenu
