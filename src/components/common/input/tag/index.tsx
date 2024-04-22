import { useEffect, useState } from 'react'

import { InputProps } from '@/src/types/input'

import S from './Tag.module.scss'
import TagChip from '../../chip/tag-chip'

const InputTag = ({ placeholder, setValue }: InputProps) => {
  const [tags, setTags] = useState<string[]>([])
  const tagColors = ['orange', 'green', 'pink', 'blue']

  const makeTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (e.nativeEvent.isComposing) {
        return
      }
      const inputElement = e.target as HTMLInputElement
      setTags([...tags, inputElement.value.trim()])
      inputElement.value = ''
    } else if (e.key === 'Backspace' && e.currentTarget.value === '') {
      setTags(tags.slice(0, -1))
    }
  }

  useEffect(() => {
    setValue('tag', tags)
  }, [tags, setValue])

  return (
    <div className={S.container}>
      <div className={S.tagList}>
        {tags.map((tag, index) => (
          <TagChip key={index} index={index} text={tag} />
        ))}
        <input
          className={S.input}
          type="text"
          onKeyDown={(e) => makeTag(e)}
          placeholder={tags.length > 0 ? '' : placeholder}
        />
      </div>
    </div>
  )
}

export default InputTag
