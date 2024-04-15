import Image from 'next/image'
import Link from 'next/link'

import { ROUTE } from '@/src/constants/route'

import { LOGO_IMAGE, LOGO_TEXT } from './constants'
import DashboardListSection from './DashboardListSection'
import S from './SideMenu.module.scss'

const SideMenu = () => {
  return (
    <aside className={S.container}>
      <header className={S['logo-wrapper']}>
        <Link href={ROUTE.landing}>
          <h1>
            <Image
              src={LOGO_IMAGE}
              width={28}
              height={33}
              alt="Taskiyfy 로고"
            />
            <Image
              className={S['logo-text']}
              src={LOGO_TEXT}
              width={80}
              height={22}
              alt="Taskyfy"
            />
          </h1>
        </Link>
      </header>
      <div className={S['list-wrapper']}>
        <DashboardListSection />
      </div>
    </aside>
  )
}

export default SideMenu
