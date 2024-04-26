import { useRouter } from 'next/router'
import { createElement, ComponentType } from 'react'

import SideMenu from '@/src/components/dashboard/side-menu'
import DashboardsProvider from '@/src/context/dashboards'
import InviteeEmailProvider from '@/src/context/inviteeEmail'
import MembersProvider from '@/src/context/members'
import { ToastProvider } from '@/src/context/toast'
import UserProvider from '@/src/context/users'
import { ChildrenProps } from '@/src/types/commonType'

import S from './Layout.module.scss'
import DashboardHeader from '../../dashboard/header'
import Toast from '../../toast'

type ContextType = ComponentType<ChildrenProps>

interface AppProviderProps extends ChildrenProps {
  contexts: ContextType[]
}

const AppProvider: React.FC<AppProviderProps> = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) => createElement(context, null, prev),
    children,
  )

const Layout = ({ children }: ChildrenProps) => {
  const { pathname } = useRouter()

  return (
    <AppProvider
      contexts={[
        MembersProvider,
        InviteeEmailProvider,
        UserProvider,
        DashboardsProvider,
        ToastProvider,
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
      <Toast />
    </AppProvider>
  )
}

export default Layout
