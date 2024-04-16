import SideMenu from '@/src/components/dashboard/side-menu'

import S from './Layout.module.scss'

import type { ChildrenProps } from '@/src/types/ChildrenProps.interface'

const Layout = ({ children }: ChildrenProps) => {
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
