import Image from 'next/image'

import S from './AddButton.module.scss'
import { ADD_BUTTON } from '../constants'

const AddButton = () => {
  return (
    <button className={S.addButton}>
      <Image src={ADD_BUTTON} width={16} height={16} alt="추가 버튼" />
    </button>
  )
}

export default AddButton
