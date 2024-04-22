import S from './TagChip.module.scss'

interface TagChipProps {
  index: number
  text: string
}

/**
 *
 * @param {index} number - 태그 색상 결정에 사용되는 인덱스
 * @param {text} string - 태그 내용
 */
const TagChip = ({ index, text }: TagChipProps) => {
  const tagColors = ['orange', 'green', 'pink', 'blue']

  return <div className={S[tagColors[index % 4]]}>{text}</div>
}

export default TagChip
