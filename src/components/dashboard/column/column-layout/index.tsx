import S from './ColumnLayout.module.scss'

import type { ChildrenProps } from '@/src/types/childrenProps.interface'

const ColumnLayout = ({ children }: ChildrenProps) => {
  return <main className={S.container}>{children}</main>
}

export default ColumnLayout
