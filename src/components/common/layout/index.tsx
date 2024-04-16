import { ReactNode } from 'react'

import SideMenu from '@/src/components/dashboard/side-menu'

import S from './Layout.module.scss'

type MyComponentProps = {
  children: ReactNode
}

const Layout = ({ children }: MyComponentProps) => {
  return (
    <div className={S.container}>
      <SideMenu />
      <div>
        <nav>nav</nav>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout
