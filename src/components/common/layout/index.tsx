import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import SideMenu from '@/src/components/dashboard/side-menu'

import S from './Layout.module.scss'
import DashboardHeader from '../../dashboard/header'
import UserProvider from '../context/users'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter()

  return (
    <UserProvider>
      <div className={S.container}>
        <SideMenu />
        <div className={S.rightSideContainer}>
          <nav>
            <DashboardHeader pathname={pathname} />
          </nav>
          <main className={S.children}>{children}</main>
        </div>
      </div>
    </UserProvider>
  )
}

export default Layout
