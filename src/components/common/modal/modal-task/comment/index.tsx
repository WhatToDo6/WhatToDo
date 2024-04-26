import { useState } from 'react'

import { putComments } from '@/pages/api/comments'
import { CommentsType } from '@/src/types/dashboard.interface'

import S from './Comment.module.scss'
import ManagerProfile from '../../../manager-profile'

const Comment = ({
  id: commentId,
  content: initialContent,
  createdAt,
  author,
  onDelete,
}: CommentsType) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(initialContent)
  const [content, setContent] = useState(initialContent)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      const requestData: { content: string } = {
        content: editContent,
      }
      await putComments(commentId, requestData)
      setIsEditing(false)
      setContent(editContent)
    } catch (error) {
      console.error('댓글 데이터를 업데이트하는 데 실패했습니다:', error)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditContent(content)
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(commentId)
    }
  }

  return (
    <div className={S.container}>
      <ManagerProfile
        type="onlyImg"
        profileImageUrl={author.profileImageUrl}
        nickname={author.nickname}
        userId={author.id}
      />
      <div className={S.comment}>
        <div className={S.title}>
          <span className={S.people}>{author.nickname}</span>
          <p className={S.createdAt}>{createdAt}</p>
        </div>
        {isEditing ? (
          <textarea
            className={S.editTextarea}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
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
