import { useRouter } from 'next/router'

import SideMenu from '@/src/components/dashboard/side-menu'
import { ChildrenProps } from '@/src/types/ChildrenProps.interface'

import S from './Layout.module.scss'
import DashboardHeader from '../../dashboard/header'

const Layout = ({ children }: ChildrenProps) => {
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
