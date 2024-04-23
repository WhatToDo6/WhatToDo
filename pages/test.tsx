import { useState } from 'react'

import Modal from '@/src/components/common/modal'
import ModalAlert from '@/src/components/common/modal/modal-alert'
import ModalDashBoard from '@/src/components/common/modal/modal-dashboard'
import ModalDeleteColumn from '@/src/components/common/modal/modal-deletecolumn'
import ModalEdittodo from '@/src/components/common/modal/modal-edittodo'
import ModalNewDash from '@/src/components/common/modal/modal-newdash'
import ModalTodo from '@/src/components/common/modal/modal-todo'

/**
 *
 * @description 모달 테스트용 페이지입니다.
 */
export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen}>
          {/* <ModalAlert content="test" buttonText="button" /> */}
          {/* <ModalDashBoard /> */}
          {/* <ModalDeleteColumn /> */}
          <ModalEdittodo />
          {/* <ModalNewDash onSubmit={() => console.log('d')} /> */}
          {/* <ModalTodo /> */}
        </Modal>
      )}

      <button onClick={() => setIsModalOpen(true)}>open</button>
    </>
  )
}
