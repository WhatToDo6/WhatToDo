import Image from 'next/image'
import { useState } from 'react'

import S from './Comment.module.scss'

interface CommentProps {
  id: number
  content: string
  createdAt: string
  author: {
    profileImageUrl: string
    nickname: string
  }
}

const Comment = ({ id, content, createdAt, author }: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    //TODO 댓글 수정 기능을 구현해야 합니다.
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedContent(content)
  }

  const handleDelete = () => {
    //TODO 댓글 삭제 기능을 구현해야 합니다.
  }

  return (
    <div className={S.container}>
      <Image
        //임시 url
        src="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/3-7_20345_1713591497409.png"
        alt="댓글 프로필"
        width={34}
        height={34}
        className={S.img}
      />
      <div className={S.comment}>
        <div className={S.title}>
          <span className={S.people}>{author.nickname}</span>
          <p className={S.createdAt}>{createdAt}</p>
        </div>
        {isEditing ? (
          <textarea
            className={S.editTextarea}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p className={S.description}>{content}</p>
        )}
        <div className={S.option}>
          {isEditing ? (
            <>
              <p className={S.optionText} onClick={handleSave}>
                저장
              </p>
              <p className={S.optionText} onClick={handleCancel}>
                취소
              </p>
            </>
          ) : (
            <>
              <p className={S.optionText} onClick={handleEdit}>
                수정
              </p>
              <p className={S.optionText} onClick={handleDelete}>
                삭제
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment
