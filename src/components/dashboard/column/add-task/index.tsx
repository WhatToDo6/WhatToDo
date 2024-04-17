import AddButton from '@/src/components/common/button/add-button'

import S from './AddTask.module.scss'

const AddTask = () => {
  return (
    <div className={S.buttonContainer}>
      <AddButton />
    </div>
  )
}

export default AddTask
