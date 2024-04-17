import AddButton from '@/src/components/common/button/add-button'

import S from './AddTask.module.scss'

const AddTask = () => {
  return (
    <div className={S.buttonWrapper}>
      <AddButton />
    </div>
  )
}

export default AddTask
