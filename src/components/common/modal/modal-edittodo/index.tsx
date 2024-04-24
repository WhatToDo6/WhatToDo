import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { putTaskCards } from '@/pages/api/taskCards'
import { fetchGetUser } from '@/pages/api/users'
import { TaskCardDataType } from '@/src/types/dashboard.interface'
import { InputFormValues } from '@/src/types/input'
import { formatDate } from '@/src/utils/formatDate'

import S from './ModalEdittodo.module.scss'
import { ModalContext } from '..'
import OptionButton from '../../button/option'
import Input from '../../input'
import InputProfileImage from '../../input/profile-image'

interface ModalEdittodoProps {
  columnId: number | undefined
  cardData: TaskCardDataType
  setCardData: React.Dispatch<React.SetStateAction<any>> //TODO: 타입 명시
}

const ModalEdittodo = ({
  columnId,
  cardData: { id, title, description, dueDate, imageUrl, tags },
  setCardData,
}: ModalEdittodoProps) => {
  const modalStatus = useContext(ModalContext)
  const [userId, setUserId] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  useEffect(() => {
    fetchGetUser().then((data) => setUserId(data.id))
  }, [])

  // 기본 값 설정
  useEffect(() => {
    setValue('title', title)
    setValue('textarea', description)
    // setValue('date', dueDate)
    // setValue('tags', tags.join(', '))
  }, [])

  const onSubmit: SubmitHandler<InputFormValues> = async (data) => {
    if (userId === undefined || columnId === undefined) return

    try {
      const assigneeUserId = userId
      const dueDate = formatDate(data.date)

      const response = await putTaskCards({
        cardId: id,
        columnId,
        assigneeUserId,
        title: data.title,
        description: data.textarea,
        dueDate: dueDate, // TODO: 날짜 수정 데이터 연결
        tags: data.tags?.split(',').map((tag) => tag.trim()), // TODO: 태그 수정 데이터 연결
        imageUrl:
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/3-7_20345_1713591497409.png',
      }) // TODO: 이미지 수정 데이터 연결
      setCardData(response)
      modalStatus.setIsOpen(false)
    } catch (error) {
      console.error('Failed to create card:', error)
    }
  }

  return (
    <div className={S.modal}>
      <div className={S.container}>
        <h1 className={S.title}>할 일 수정</h1>
        <div className={S.row}>
          <div className={S.box}>
            <label className={S.label} htmlFor="status">
              상태
            </label>
            <Input
              inputType="progress"
              register={register}
              setValue={setValue}
            />
          </div>
          <div className={S.box}>
            <label className={S.label} htmlFor="keeper">
              담당자
            </label>
            <Input
              inputType="manager"
              placeholder="이름을 입력해주세요"
              register={register}
              setValue={setValue}
            />
          </div>
        </div>
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
            handleImageChange={() => console.log('로직 연결 필요')}
          />
        </div>
      </div>
      <div className={S.button}>
        <OptionButton
          size="large"
          leftColor="white"
          rightColor="purple"
          leftText="취소"
          rightText="수정"
          onLeftClick={() => modalStatus.setIsOpen.call(null, false)}
          onRightClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  )
}

export default ModalEdittodo
