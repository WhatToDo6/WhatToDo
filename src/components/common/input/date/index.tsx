import { ko } from 'date-fns/locale/ko'
import Image from 'next/image'
import { useState } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import { Controller } from 'react-hook-form'

import CALENDAR_BLACK_ICON from '@/public/icons/calendar-black.svg'
import CALENDAR_GRAY_ICON from '@/public/icons/calendar-gray.svg'
import { InputProps } from '@/src/types/input'

import S from './Date.module.scss'

interface InputDateProps extends InputProps {
  defaultValue?: string
}

/**
 *
 * @description textarea 타입의 input 컴포넌트
 * @param placeholder - input placeholder
 * @param error - react-hook-form의 에러 객체
 * @param register - react-hook-form의 register 함수
 * @ref [react-datepicker](https://www.npmjs.com/package/react-datepicker)
 */

const InputDate = ({ placeholder, control, defaultValue }: InputDateProps) => {
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
                selected={value}
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
            </>
          )
        }}
      />
    </div>
  )
}

export default InputDate
