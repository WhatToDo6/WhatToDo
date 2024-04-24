import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

import { fetchPutDashboardEdit } from '@/pages/api/dashboards'
import { DashboardsContext } from '@/src/context/dashboards'
import { InputFormValues } from '@/src/types/input'
import { EditDahsboardParamType } from '@/src/types/mydashboard'

import S from './DashboardEditor.module.scss'
import BorderButton from '../../common/button/border'
import ColorChip from '../../common/chip/color-chip'
import Input from '../../common/input'

interface DashboardEditorProps {
  dashboardId: number
}

const initialColor = '#7AC555'

function DashboardEditor({ dashboardId }: DashboardEditorProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputFormValues>({ mode: 'onBlur' })
  const [selectedColor, setSelectedColor] = useState(initialColor)

  const { setDashboardDetail } = useContext(DashboardsContext)

  const editDashboard = async (data: EditDahsboardParamType) => {
    try {
      const dashboard = await fetchPutDashboardEdit(data, dashboardId)
      reset({ newDash: '' })
      setSelectedColor(initialColor)
      setDashboardDetail(dashboard)
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
