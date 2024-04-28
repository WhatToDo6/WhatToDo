import { ko } from 'date-fns/locale/ko'
import Image from 'next/image'
import { useState } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import { Controller } from 'react-hook-form'

import CALENDAR_BLACK_ICON from '@/public/icons/calendar-black.svg'
import CALENDAR_GRAY_ICON from '@/public/icons/calendar-gray.svg'
import DELETE_ICON from '@/public/icons/delete.svg'
import { InputProps } from '@/src/types/input'

import S from './Date.module.scss'

/**
 *
 * @description textarea 타입의 input 컴포넌트
 * @param placeholder - input placeholder
 * @param error - react-hook-form의 에러 객체
 * @param register - react-hook-form의 register 함수
 * @ref [react-datepicker](https://www.npmjs.com/package/react-datepicker)
 */

const InputDate = ({ placeholder, control, setValue }: InputProps) => {
  const [isFocus, setIsFocus] = useState(false)
  registerLocale('ko', ko)

  return (
    <div
      className={`${S.container} ${isFocus === true && S.focus}`}
      onMouseLeave={() => setIsFocus(false)}
    >
      <Controller
        name="date"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <>
              <div className={S.icon}>
                <Image
                  src={value ? CALENDAR_BLACK_ICON : CALENDAR_GRAY_ICON}
                  fill
                  alt="날짜 선택"
                />
              </div>
              <ReactDatePicker
                selected={value instanceof Date ? value : null}
                onInputClick={() => setIsFocus(true)}
                onChange={(e) => {
                  onChange(e)
                  setIsFocus(false)
                }}
                showTimeSelect
                dateFormat="yyyy-MM-dd HH:mm"
                placeholderText={placeholder}
                minDate={new Date()}
                locale="ko"
                timeCaption="시간"
              />
              <Image
                src={DELETE_ICON}
                className={S.delete}
                alt="삭제"
                width={20}
                height={20}
                onClick={() => setValue && setValue('date', undefined)}
              />
            </>
          )
        }}
      />
    </div>
  )
}

export default InputDate
