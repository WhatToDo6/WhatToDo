import Image from 'next/image'

import S from './AddColumn.module.scss'
import { ADD_BOARD_BTN } from '../constants'

const AddColumn = () => {
  return (
    <div className={S.buttonWrapper}>
      <p className={S.text}>새로운 칼럼 추가하기</p>
      <Image src={ADD_BOARD_BTN} width={22} height={22} alt="task 추가 버튼" />
    </div>
  )
}

export default AddColumn
