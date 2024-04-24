import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import SideMenu from '@/src/components/dashboard/side-menu'
import DashboardsProvider from '@/src/context/dashboards'
import InviteeEmailProvider from '@/src/context/inviteeEmail'
import UserProvider from '@/src/context/users'

import S from './Layout.module.scss'
import DashboardHeader from '../../dashboard/header'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter()

  return (
    <InviteeEmailProvider>
      <DashboardsProvider>
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
      </DashboardsProvider>
    </InviteeEmailProvider>
  )
}

export default Layout
