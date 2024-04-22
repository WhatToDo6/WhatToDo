import { useState } from 'react'
import { useForm } from 'react-hook-form'

import AXIOS from '@/lib/axios'
import { InputFormValues } from '@/src/types/input'

import S from './DashboardEditor.module.scss'
import BorderButton from '../../common/button/border'
import ColorChip from '../../common/chip'
import Input from '../../common/input'

interface editDahsboardParam {
  title: string
  color: string
}

interface DashboardEditorProps {
  dashboardId: number
}

function DashboardEditor({ dashboardId }: DashboardEditorProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormValues>({ mode: 'onBlur' })
  const [selectedColor, setSelectedColor] = useState('#7AC555')

  const editDashboard = async (data: editDahsboardParam) => {
    const token = localStorage.getItem('accessToken')
    try {
      AXIOS.put(`/dashboards/${dashboardId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form
      className={S.container}
      onSubmit={handleSubmit((data) => {
        const { newDash: title } = data
        editDashboard({ title: title, color: selectedColor })
      })}
    >
      <div className={S.header}>
        <span>비브리지</span>
        <ColorChip
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div>
      <div className={S.inputTitle}>대시보드 이름</div>
      <Input
        inputType="newDash"
        placeholder="뉴프로젝트"
        register={register}
        error={errors.newDash}
        size="large"
      />
      <div className={S.buttonBox}>
        <BorderButton size="small" color="purple">
          변경
        </BorderButton>
      </div>
    </form>
  )
}

export default DashboardEditor
