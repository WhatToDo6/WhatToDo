import { ReactNode } from 'react'

import S from './Layout.module.scss'
import SideMenu from '../side-menu'

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
