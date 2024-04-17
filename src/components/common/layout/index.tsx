import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import SideMenu from '@/src/components/dashboard/side-menu'

import S from './Layout.module.scss'
import DashboardHeader from '../../dashboard/header'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const {
    query: { id },
  } = useRouter()

  return (
    <div className={S.container}>
      <SideMenu />
      <div className={S.rightSideContainer}>
        <nav>
          <DashboardHeader id={id} />
        </nav>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout
