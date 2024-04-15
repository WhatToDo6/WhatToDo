import Image from 'next/image'

import S from './ListHeader.module.scss'
import { ADD_BOX } from '../../constants'

const ListHeader = () => {
  return (
    <div className={S.wrapper}>
      <h2 className={S.title}>Dash Boards</h2>
      <Image
        className={S['add-button']}
        src={ADD_BOX}
        width={20}
        height={20}
        alt="대시보드 생성 버튼"
      />
    </div>
  )
}

export default ListHeader
