import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { postTaskCards } from '@/pages/api/taskCards'
import { TaskCardDataType } from '@/src/types/dashboard.interface'
import { InputFormValues } from '@/src/types/input'
import { formatDate } from '@/src/utils/formatDate'

import S from './ModalTodo.module.scss'
import { ModalContext } from '..'
import OptionButton from '../../button/option'
import Input from '../../input'

interface ModalTodoProps {
  columnId: number | undefined
  dashboardId: number
  onCreateTaskCard: (newTaskCard: TaskCardDataType) => void
}

const ModalTodo = ({
  columnId,
  dashboardId,
  onCreateTaskCard: onTaskCardCreated,
}: ModalTodoProps) => {
  const modalStatus = useContext(ModalContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<InputFormValues> = async (data) => {
    try {
      const assigneeUserId = 1709
      const dueDate = formatDate(data.date)

      const response = await postTaskCards({
        assigneeUserId,
        dashboardId,
        columnId,
        title: data.title,
        description: data.textarea,
        dueDate: dueDate,
        tags: data.tags?.split(',').map((tag) => tag.trim()),
        imageUrl:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/3-7_20345_1713591497409.png',
      }) // 임시 이미지 url
      onTaskCardCreated(response)
      modalStatus.setIsOpen(false)
    } catch (error) {
      console.error('Failed to create card:', error)
    }
  }

  return (
    <div className={S.modal}>
      <div className={S.container}>
        <h1 className={S.title}>할 일 생성</h1>
        <label className={S.label} htmlFor="keeper">
          담당자
        </label>
        <Input
          inputType="manager"
          placeholder="이름을 입력해주세요"
          register={register}
          setValue={setValue}
        />
        <label className={S.label} htmlFor="title">
          제목<span className={S.required}>*</span>
        </label>
        <Input
          inputType="title"
          placeholder="제목을 입력해주세요"
          error={errors.title}
          register={register}
        />
        <label className={S.label} htmlFor="description">
          설명<span className={S.required}>*</span>
        </label>
        <Input
          inputType="textarea"
          placeholder="설명을 입력해주세요"
          error={errors.textarea}
          register={register}
        />
        <label className={S.label} htmlFor="due">
          마감일
        </label>
        <Input
          inputType="date"
          placeholder="날짜를 입력해주세요"
          error={errors.date}
          register={register}
          control={control}
        />
        <label className={S.label} htmlFor="tag">
          태그
        </label>
        <Input
          inputType="tag"
          placeholder="입력 후 Enter"
          register={register}
          setValue={setValue}
        />
        <label className={S.label} htmlFor="image">
          이미지
        </label>
        <div className={S.imageContainer}>
          <Input inputType="image" register={register} setValue={setValue} />
        </div>
      </div>
      <div className={S.button}>
        <OptionButton
          size="large"
          leftColor="white"
          rightColor="purple"
          leftText="취소"
          rightText="생성"
          onLeftClick={() => modalStatus.setIsOpen.call(null, false)}
          onRightClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  )
}

export default ModalTodo
