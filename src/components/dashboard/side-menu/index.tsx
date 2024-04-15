import Image from 'next/image'
import Link from 'next/link'

import DashboardListSection from '@/src/components/dashboard/side-menu/dashboard-list-section'
import { ROUTE } from '@/src/constants/route'

import { LOGO_IMAGE, LOGO_TEXT } from './constants'
import S from './SideMenu.module.scss'

const SideMenu = () => {
  return (
    <aside className={S.container}>
      <header className={S.logoWrapper}>
        <Link href={ROUTE.landing}>
          <h1>
            <Image
              src={LOGO_IMAGE}
              width={28}
              height={33}
              alt="Taskiyfy 로고"
            />
            <Image
              className={S.logoText}
              src={LOGO_TEXT}
              width={80}
              height={22}
              alt="Taskiyfy"
            />
          </h1>
        </Link>
      </header>
      <div className={S.listWrapper}>
        <DashboardListSection />
      </div>
    </aside>
  )
}

export default SideMenu
