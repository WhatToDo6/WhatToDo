import { useContext, useEffect, useState } from 'react'

import { InputProps } from '@/src/types/input'

import S from './Tag.module.scss'
import TagChip from '../../chip/tag-chip'
import { CardContext } from '../../modal/modal-edittodo'

const InputTag = ({ placeholder, setValue }: InputProps) => {
  const cardStatus = useContext(CardContext)
  const [tags, setTags] = useState<string[]>([])
  const [isFocus, setIsFocus] = useState(false)

  const makeTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (e.nativeEvent.isComposing) {
        return
      }
      const inputElement = e.target as HTMLInputElement
      const newTags = [...tags, inputElement.value.trim()]
      setTags(newTags)
      setValue('tags', newTags) // 'tags'로 필드 이름 지정
      inputElement.value = ''
    } else if (e.key === 'Backspace' && e.currentTarget.value === '') {
      setTags(tags.slice(0, -1))
      setValue('tags', tags.slice(0, -1)) // 태그 배열 업데이트 시 setValue 호출
    }
  }

  useEffect(() => {
    if (cardStatus?.tags) {
      setTags(cardStatus.tags)
    }
  }, [])

  useEffect(() => {
    setIsFocus(false)
  }, [tags])

  return (
    <div
      className={`${S.container} ${isFocus ? S.focus : ''}`}
      onClick={() => setIsFocus(true)}
      onMouseLeave={() => setIsFocus(false)}
    >
      <div className={S.tagList}>
        {tags.map((tag, index) => (
          <TagChip key={index} index={index} text={tag} />
        ))}
        <input
          className={S.input}
          type="text"
          onKeyDown={makeTag}
          placeholder={tags.length > 0 ? '' : placeholder}
        />
      </div>
    </div>
  )
}

export default InputTag
