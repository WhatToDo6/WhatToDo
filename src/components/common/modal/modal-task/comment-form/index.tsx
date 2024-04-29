import { MouseEvent, useState } from 'react'

import { postComments } from '@/pages/api/comments'
import { useColumnsContext } from '@/src/components/dashboard/column/column-layout'
import { CommentsType } from '@/src/types/dashboard'

import S from './CommentForm.module.scss'
import BorderButton from '../../../button/border'

interface CommentFormProps {
  setComments: React.Dispatch<React.SetStateAction<CommentsType[]>>
  cardId: number
  columnId: number | undefined
}

const CommentForm = ({ setComments, cardId, columnId }: CommentFormProps) => {
  const { dashboardId } = useColumnsContext()
  const [inputText, setInputText] = useState('')

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const newComment = await postComments(
        inputText,
        cardId,
        columnId,
        dashboardId,
      )
      if (newComment) {
        setComments((prevComments) => [newComment, ...prevComments])
        setInputText('')
      }
    } catch (error) {
      console.error('댓글을 전송하는 데 실패했습니다:', error)
    }
  }

  return (
    <form className={S.container}>
      <span className={S.comment}>댓글</span>
      <textarea
        className={S.input}
        placeholder="댓글 작성하기"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className={S.button}>
        <BorderButton
          size="change"
          color="white"
          onClick={handleClick}
          isDisabled={!inputText.trim()}
        >
          입력
        </BorderButton>
      </div>
    </form>
  )
}

export default CommentForm
