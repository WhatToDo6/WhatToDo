import S from './Layout.module.scss'

interface LayoutProps extends React.PropsWithChildren {}

const Layout = ({ children }: LayoutProps) => {
  return <div className={S.container}>{children}</div>
}

export default Layout
