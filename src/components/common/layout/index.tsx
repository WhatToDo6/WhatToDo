import { useRouter } from 'next/router'
import { ReactNode, createElement, ComponentType } from 'react'

import SideMenu from '@/src/components/dashboard/side-menu'
import DashboardsProvider from '@/src/context/dashboards'
import InviteeEmailProvider from '@/src/context/inviteeEmail'
import MembersProvider from '@/src/context/members'
import UserProvider from '@/src/context/users'

import S from './Layout.module.scss'
import DashboardHeader from '../../dashboard/header'

type LayoutProps = {
  children: ReactNode
}

type ContextType = ComponentType<{ children: ReactNode }>

interface AppProviderProps {
  contexts: ContextType[]
  children: ReactNode
}

const AppProvider: React.FC<AppProviderProps> = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) => createElement(context, null, prev),
    children,
  )

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter()

  return (
    <AppProvider
      contexts={[
        MembersProvider,
        InviteeEmailProvider,
        DashboardsProvider,
        UserProvider,
      ]}
    >
      <div className={S.container}>
        <SideMenu />
        <div className={S.rightSideContainer}>
          <nav>
            <DashboardHeader pathname={pathname} />
          </nav>
          <main className={S.children}>{children}</main>
        </div>
      </div>
    </AppProvider>
  )
}

export default Layout
