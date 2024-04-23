import { MouseEvent } from 'react'

import S from './CommentForm.module.scss'
import BorderButton from '../../../button/border'

const CommentForm = () => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    //TODO 입력 버튼 누르면 수행해야하는 함수 구현해야 합니다!
    e.preventDefault()
  }
  return (
    <form className={S.container}>
      <span className={S.comment}>댓글</span>
      <textarea className={S.input} placeholder="댓글 작성하기" />
      <div className={S.button}>
        <BorderButton size="change" color="white" onClick={handleClick}>
          입력
        </BorderButton>
      </div>
    </form>
  )
}

export default CommentForm
