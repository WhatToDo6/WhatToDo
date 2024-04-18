import Image from 'next/image'

import S from './AddTask.module.scss'
import { ADD_BOARD_BTN } from '../constants'

const AddTask = () => {
  return (
    <div className={S.buttonWrapper}>
      <Image src={ADD_BOARD_BTN} width={22} height={22} alt="task 추가 버튼" />
    </div>
  )
}

export default AddTask
