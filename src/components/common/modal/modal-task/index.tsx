import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'

import { deleteComment, getComments } from '@/pages/api/comments'
import { ColumnContext } from '@/pages/dashboards/[id]'
import BAR_ICON from '@/public/icons/bar.svg'
import CLOSE_ICON from '@/public/icons/close.svg'
import POPOVER_ICON from '@/public/icons/popover.svg'
import useIntersectionObserver from '@/src/hooks/useInterSectionObserver'
import { CommentsType, TaskCardDataType } from '@/src/types/dashboard.interface'

import Comment from './comment'
import CommentForm from './comment-form/index'
import S from './ModalTask.module.scss'
import Modal, { ModalContext } from '..'
import ProgressChip from '../../chip/progress-chip'
import TagChip from '../../chip/tag-chip'
import ManagerProfile from '../../manager-profile'
import ModalEdittodo from '../modal-edittodo'

interface ModalTaskProps {
  cardId: number
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
  columnId: number | undefined
  columnTitle: string
  cardData: TaskCardDataType
  setCardData: React.Dispatch<React.SetStateAction<TaskCardDataType>>
}

const ModalTask = ({
  cardId,
  columnId,
  title,
  description,
  tags,
  dueDate,
  assignee,
  imageUrl,
  cardData,
  setCardData,
  columnTitle,
}: ModalTaskProps) => {
  const modalStatus = useContext(ModalContext)
  const columnStatus = useContext(ColumnContext)

  const observeRef = useRef<HTMLDivElement>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [comments, setComments] = useState<CommentsType[]>([])
  const [nextCursorId, setNextCursorId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { observe, isScrolled } = useIntersectionObserver()

  const [newCardData, setNewCardData] = useState(cardData)

  const handleClose = () => {
    modalStatus.setIsOpen.call(null, false)
  }

  const fetchComments = async (firstFetch: boolean = false) => {
    if (cardId) {
      try {
        const { data: comments, nextCursorId: fetchNextCursorId } =
          await getComments(
            cardId,
            firstFetch ? null : nextCursorId,
            firstFetch,
          )
        setComments((prev) => (firstFetch ? comments : [...prev, ...comments]))
        setNextCursorId(fetchNextCursorId)
      } catch (error) {
        console.error('댓글을 불러오는 데 실패했습니다.:', error)
      }
    }
  }

  const DeleteComments = async (commentId: number) => {
    try {
      await deleteComment(commentId)
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId),
      )
    } catch (error) {
      console.error('댓글을 삭제하는 데 실패했습니다:', error)
    }
  }

  useEffect(() => {
    fetchComments(true)
  }, [cardId])

  useEffect(() => {
    if (comments.length >= 3 && observeRef.current) {
      observe(observeRef.current)
    }
  }, [observe, comments])

  useEffect(() => {
    if (isScrolled && nextCursorId) {
      fetchComments()
    }
  }, [isScrolled, nextCursorId])

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev)
  }

  const handlePopoverDelete = () => {
    //TODO 팝오버에서 삭제하기 기능 구현
  }

  console.log(newCardData)

  useEffect(() => {
    isModalOpen === false && setIsPopoverOpen(false)
  }, [isModalOpen])

  return (
    <div className={S.container}>
      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen}>
          <ModalEdittodo cardData={newCardData} setCardData={setNewCardData} />
        </Modal>
      )}
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
            <button
              className={S.popoverOption}
              onClick={() => setIsModalOpen(true)}
            >
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
            <ProgressChip progress={columnStatus[newCardData.columnId]} />
            <Image src={BAR_ICON} alt="구분선" width={0} height={20} />
            <div className={S.tags}>
              {tags.map((tag, index) => (
                <TagChip key={index} index={index} text={tag} />
              ))}
            </div>
          </div>
          <p className={S.text}>{description}</p>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="임시 사진"
              width={450}
              height={262}
              className={S.contentImg}
            />
          )}
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
      <CommentForm
        cardId={cardId}
        columnId={columnId}
        setComments={setComments}
      />
      {comments?.map((comment) => (
        <Comment key={comment.id} {...comment} onDelete={DeleteComments} />
      ))}
      <div ref={observeRef} />
    </div>
  )
}

export default ModalTask
