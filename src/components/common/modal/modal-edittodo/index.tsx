import { createContext, useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { handleImageChange } from '@/pages/api/imageUpload'
import { putTaskCards } from '@/pages/api/taskCards'
import { fetchGetUser } from '@/pages/api/users'
import { EMPTY_DUEDATE } from '@/src/constants/date'
import { TaskCardDataType } from '@/src/types/dashboard.interface'
import { InputFormValues } from '@/src/types/input'
import { formatDate } from '@/src/utils/formatDate'
import { formatLocalDate } from '@/src/utils/formatLocalDate'

import S from './ModalEdittodo.module.scss'
import { ModalContext } from '..'
import OptionButton from '../../button/option'
import Input from '../../input'
import InputProfileImage from '../../input/profile-image'

interface ModalEdittodoProps {
  cardData: TaskCardDataType
  setCardData: React.Dispatch<React.SetStateAction<any>> //TODO: 타입 명시
}

export const CardContext = createContext<TaskCardDataType>(
  {} as TaskCardDataType,
)

const ModalEdittodo = ({ cardData, setCardData }: ModalEdittodoProps) => {
  const modalStatus = useContext(ModalContext)
  const [userId, setUserId] = useState()
  const [imageUrl, setImageUrl] = useState<string | undefined>()
  const [isDisabled, setIsDisabled] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  useEffect(() => {
    fetchGetUser().then((data) => setUserId(data.id))
  }, [])

  // 기본 값 설정
  useEffect(() => {
    setValue('status', cardData.columnId)
    setValue('manager', cardData.assignee.id)
    setValue('title', cardData.title)
    setValue('textarea', cardData.description)
    cardData.dueDate === EMPTY_DUEDATE
      ? setValue('date', null)
      : setValue('date', formatLocalDate(cardData.dueDate))
    setValue('tags', cardData.tags.join(','))
    setImageUrl(cardData.imageUrl)
  }, [])

  useEffect(() => {
    if (watch('title') && watch('textarea') && watch('status')) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [watch('title'), watch('textarea'), watch('status')])

  const onSubmit: SubmitHandler<InputFormValues> = async (data) => {
    if (userId === undefined) return

    try {
      const dueDate = data.date ? formatDate(String(data.date)) : EMPTY_DUEDATE

      let tags

      if (data.tags.length === 0) {
        tags = undefined
      } else {
        if (typeof data.tags === 'string') {
          tags = data.tags.split(',')
        } else {
          tags = data.tags
        }
      }

      const response = await putTaskCards({
        cardId: cardData.id,
        columnId: data.status,
        assigneeUserId: data.manager,
        title: data.title,
        description: data.textarea,
        dueDate: dueDate,
        tags: tags,
        imageUrl: imageUrl || undefined,
      })
      setCardData(response)
      modalStatus.setIsOpen(false)
    } catch (error) {
      console.error('Failed to create card:', error)
    }
  }

  return (
    <CardContext.Provider value={cardData}>
      <div className={S.modal}>
        <div className={S.container}>
          <h1 className={S.title}>할 일 수정</h1>
          <div className={S.row}>
            <div className={S.box}>
              <label className={S.label} htmlFor="status">
                상태
              </label>
              <Input
                inputType="status"
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
            마감일<span className={S.required}>*</span>
          </label>
          <Input
            inputType="date"
            placeholder="날짜를 입력해주세요"
            error={errors.date}
            register={register}
            control={control}
            setValue={setValue}
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
                handleImageChange(event, setImageUrl, cardData.columnId)
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
            rightText="수정"
            onLeftClick={() => modalStatus.setIsOpen.call(null, false)}
            onRightClick={handleSubmit(onSubmit)}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </CardContext.Provider>
  )
}

export default ModalEdittodo
