import { useRouter } from 'next/router'

import S from './Layout.module.scss'
import { SignPath } from '../welcome-logo'

interface LayoutProps extends React.PropsWithChildren {}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const currPath = router.pathname as SignPath

  return <div className={S[currPath.slice(1)]}>{children}</div>
}

export default Layout
