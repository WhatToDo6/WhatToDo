import Image from 'next/image'
import { useContext, useState } from 'react'

import BAR_ICON from '@/public/icons/bar.svg'
import CLOSE_ICON from '@/public/icons/close.svg'
import POPOVER_ICON from '@/public/icons/popover.svg'

import Comment from './comment'
import CommentForm from './comment-form/input'
import S from './ModalTask.module.scss'
import { ModalContext } from '..'
import ProgressChip from '../../chip/progress-chip'
import TagChip from '../../chip/tag-chip'
import ManagerProfile from '../../manager-profile'

const dummyComment = {
  id: 1,
  content: '안녕안녕',
  createdAt: '2024-04-04',
  author: {
    profileImageUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/4-6_1710_1713772649563.png',
    nickname: '안연아',
  },
}
// 임시로 더미 데이터를 만들어놨습니다. 실제 모달 적용할 때 이 부분 말고 실제 데이터를 입력 해야합니다!

interface ModalTaskProps {
  title: string
  description: string
  tags: string[]
  dueDate: string
  assignee: {
    profileImageUrl: string
    nickname: string
    id: number
  }
  imageUrl: string
}

const ModalTask = ({
  title,
  description,
  tags,
  dueDate,
  assignee,
  imageUrl,
}: ModalTaskProps) => {
  const modalStatus = useContext(ModalContext)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleClose = () => {
    modalStatus.setIsOpen.call(null, false)
  }

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev)
  }

  const handlePopoverEdit = () => {
    //TODO 팝오버에서 수정하기 기능 구현
  }

  const handlePopoverDelete = () => {
    //TODO 팝오버에서 삭제하기 기능 구현
  }

  return (
    <div className={S.container}>
      <div className={S.titleContainer}>
        <span className={S.title}>{title}</span>
        <Image
          src={POPOVER_ICON}
          alt=""
          width={32}
          height={32}
          className={S.popover}
          onClick={togglePopover}
        />
        {isPopoverOpen && (
          <div className={S.popoverContainer}>
            <button className={S.popoverOption} onClick={handlePopoverEdit}>
              수정하기
            </button>
            <button className={S.popoverOption} onClick={handlePopoverDelete}>
              삭제하기
            </button>
          </div>
        )}
        <Image
          src={CLOSE_ICON}
          alt=""
          width={32}
          height={32}
          onClick={handleClose}
          className={S.close}
        />
      </div>
      <div className={S.contentContainer}>
        <div className={S.content}>
          <div className={S.chips}>
            <ProgressChip progress={0} />
            {/* progress 값을 줘야 합니다 */}
            <Image src={BAR_ICON} alt="구분선" width={0} height={20} />
            <div className={S.tags}>
              {tags.map((tag, index) => (
                <TagChip key={index} index={index} text={tag} />
              ))}
            </div>
          </div>
          <p className={S.text}>{description}</p>
          <Image
            src={imageUrl}
            alt="임시 사진"
            width={450}
            height={262}
            className={S.contentImg}
          />
        </div>
        <div className={S.taskDetails}>
          <div className={S.assignee}>
            <span className={S.detailTitle}>담당자</span>
            <ManagerProfile
              profileImageUrl={assignee.profileImageUrl}
              nickname={assignee.nickname}
              type="card"
            />
          </div>
          <div className={S.dueDate}>
            <span className={S.detailTitle}>마감일</span>
            <p className={S.detailText}>{dueDate}</p>
          </div>
        </div>
      </div>
      <CommentForm />
      <Comment
        id={dummyComment.id}
        content={dummyComment.content}
        createdAt={dummyComment.createdAt}
        author={dummyComment.author}
      />
      {/* 지금은 Comment 컴포넌트를 이렇게 구현했지만 이 부분 댓글 목록 조회해서 무한 스크롤 구현해야 합니다.  */}
    </div>
  )
}

export default ModalTask
