import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { handleImageChange } from '@/pages/api/imageUpload'
import { postTaskCards } from '@/pages/api/taskCards'
import { fetchGetUser } from '@/pages/api/users'
import { EMPTY_DUEDATE } from '@/src/constants/date'
import { InputFormValues } from '@/src/types/input'
import { ModalTodoProps } from '@/src/types/modal'
import { formatDate } from '@/src/utils/formatDate'

import S from './ModalTodo.module.scss'
import { ModalContext } from '..'
import OptionButton from '../../button/option'
import Input from '../../input'
import InputProfileImage from '../../input/profile-image'

const ModalTodo = ({
  columnId,
  dashboardId,
  onCreateTaskCard,
}: ModalTodoProps) => {
  const modalStatus = useContext(ModalContext)
  const [userId, setUserId] = useState()
  const [imageUrl, setImageUrl] = useState<string | undefined>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<InputFormValues>({ mode: 'onChange' })

  useEffect(() => {
    fetchGetUser().then((data) => setUserId(data.id))
  }, [])

  const onSubmit: SubmitHandler<InputFormValues> = async (data) => {
    if (userId === undefined) return

    try {
      const dueDate = data.date ? formatDate(String(data.date)) : EMPTY_DUEDATE
      const assigneeUserId = data.manager ? data.manager : userId

      const response = await postTaskCards({
        assigneeUserId: assigneeUserId,
        dashboardId,
        columnId,
        title: data.title,
        description: data.textarea,
        dueDate: dueDate,
        tags: data.tags,
        imageUrl: imageUrl,
      })
      onCreateTaskCard(response)
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
          <InputProfileImage
            profileImageUrl={imageUrl}
            handleImageChange={(event) => {
              handleImageChange(event, setImageUrl, columnId)
            }}
          />
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
