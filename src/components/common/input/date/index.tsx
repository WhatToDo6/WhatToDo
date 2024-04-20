import Image from 'next/image'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import CALENDAR_BLACK_ICON from '@/public/icons/calendar-black.svg'
import CALENDAR_GRAY_ICON from '@/public/icons/calendar-gray.svg'
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

const InputDate = () => {
  const [selectedDate, setSelectedDate] = useState<any>()

  return (
    <div className={S.container}>
      <div className={S.icon}>
        <Image
          src={selectedDate ? CALENDAR_BLACK_ICON : CALENDAR_GRAY_ICON}
          fill
          alt="날짜 선택"
        />
      </div>
      <div className={S.calendar}>
        <ReactDatePicker
          selected={selectedDate}
          onChange={(date) => date && setSelectedDate(date)}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="날짜를 입력해주세요"
          minDate={new Date()}
        />
      </div>
    </div>
  )
}

export default InputDate
