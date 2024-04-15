import Image from 'next/image'

import S from './ListHeader.module.scss'
import { ADD_BOX } from '../../constants'

const ListHeader = () => {
  return (
    <header className={S.wrapper}>
      <h2 className={S.title}>Dash Boards</h2>
      <Image
        className={S['add-button']}
        src={ADD_BOX}
        width={20}
        height={20}
        alt="대시보드 생성 버튼"
      />
    </header>
  )
}

export default ListHeader
