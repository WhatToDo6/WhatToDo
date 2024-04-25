import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { fetchPutDashboardEdit } from '@/pages/api/dashboards'
import { DashboardsContext } from '@/src/context/dashboards'
import { useToast } from '@/src/context/toast'
import { InputFormValues } from '@/src/types/input'
import { EditDahsboardParamType } from '@/src/types/mydashboard'

import S from './DashboardEditor.module.scss'
import BorderButton from '../../common/button/border'
import ColorChip from '../../common/chip/color-chip'
import Input from '../../common/input'

interface DashboardEditorProps {
  dashboardId: number
}

function DashboardEditor({ dashboardId }: DashboardEditorProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const { addToast } = useToast()

  const { dashboardDetail, setDashboardDetail, editSideMenuDashboards } =
    useContext(DashboardsContext)

  const initialColor =
    dashboardDetail && typeof dashboardDetail.color === 'string'
      ? dashboardDetail.color
      : ''

  const [selectedColor, setSelectedColor] = useState(initialColor)

  const editDashboard = async (data: EditDahsboardParamType) => {
    try {
      const dashboard = await fetchPutDashboardEdit(data, dashboardId)
      reset({ newDash: '' })
      setSelectedColor(initialColor)
      setDashboardDetail(dashboard)
      editSideMenuDashboards(dashboard)
      addToast('대시보드가 성공적으로 업데이트 되었습니다', 'success')
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    setSelectedColor(initialColor)
  }, [initialColor])

  return (
    <form
      className={S.container}
      onSubmit={handleSubmit((data) => {
        const { newDash: title } = data
        editDashboard({ title: title, color: selectedColor })
      })}
    >
      <div className={S.header}>
        <span>{dashboardDetail && dashboardDetail.title}</span>
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
