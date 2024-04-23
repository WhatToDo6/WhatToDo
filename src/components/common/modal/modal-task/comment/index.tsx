import Image from 'next/image'

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
  const handleEdit = () => {
    //TODO 댓글 수정 기능을 구현해야 합니다.
    console.log(id)
  }

  const handleDelete = () => {
    //TODO 댓글 삭제 기능을 구현해야 합니다.
  }

  return (
    <div className={S.container}>
      <Image
        src={author.profileImageUrl}
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
        <p className={S.description}>{content}</p>
        <div className={S.option}>
          <p className={S.optionText} onClick={handleEdit}>
            수정
          </p>
          <p className={S.optionText} onClick={handleDelete}>
            삭제
          </p>
        </div>
      </div>
    </div>
  )
}

export default Comment
