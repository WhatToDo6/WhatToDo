import S from './ColumnLayout.module.scss'

import type { ChildrenProps } from '@/src/types/commonType'

const ColumnLayout = ({ children }: ChildrenProps) => {
  return <main className={S.container}>{children}</main>
}

export default ColumnLayout
