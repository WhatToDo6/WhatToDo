import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import SideMenu from '@/src/components/dashboard/side-menu'

import S from './Layout.module.scss'
import DashboardHeader from '../../dashboard/header'

type LayoutProps = {
  children: ReactNode
}
//dfdffd
const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter()

  return (
    <div className={S.container}>
      <SideMenu />
      <div className={S.rightSideContainer}>
        <nav>
          <DashboardHeader pathname={pathname} />
        </nav>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout
