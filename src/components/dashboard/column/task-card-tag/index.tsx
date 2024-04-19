import S from './TaskCardTag.module.scss'

const TAG_TYPE: any = {
  프로젝트: {
    background: '#F9EEE3',
    color: '#D58D49',
  },
  일반: {
    background: '#E7F7DB',
    color: '#86D549',
  },
  백엔드: {
    background: '#F7DBF0',
    color: '#D549B6',
  },
  상: {
    background: '#DBE6F7',
    color: '#4981D5',
  },
}

const TaskCardTag = ({ tagType }: any) => {
  const type = TAG_TYPE[tagType]

  return (
    <div className={S.container} style={{ backgroundColor: type.background }}>
      <div className={S.tagContent} style={{ color: type.color }}>
        {tagType}
      </div>
    </div>
  )
}

export default TaskCardTag
