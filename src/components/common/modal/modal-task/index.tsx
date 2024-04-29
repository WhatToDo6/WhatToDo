import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'

import { deleteComment, getComments } from '@/pages/api/comments'
import { deleteTaskCards } from '@/pages/api/taskCards'
import BAR_ICON from '@/public/icons/bar.svg'
import CLOSE_ICON from '@/public/icons/close.svg'
import POPOVER_ICON from '@/public/icons/popover.svg'
import { useColumnsContext } from '@/src/components/dashboard/column/column-layout'
import { EMPTY_DUEDATE } from '@/src/constants/date'
import useIntersectionObserver from '@/src/hooks/useInterSectionObserver'
import { CommentsType, TaskCardDataType } from '@/src/types/dashboard'
import { ModalTaskProps } from '@/src/types/modal'
import { formatDate } from '@/src/utils/formatDate'

import Comment from './comment'
import CommentForm from './comment-form/index'
import S from './ModalTask.module.scss'
import Modal, { ModalContext } from '..'
import ProgressChip from '../../chip/progress-chip'
import TagChip from '../../chip/tag-chip'
import ManagerProfile from '../../manager-profile'
import Spinner from '../../spinner'
import ModalEdittodo from '../modal-edittodo'

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
  setTaskCards,
}: ModalTaskProps) => {
  const modalStatus = useContext(ModalContext)
  const { columnList } = useColumnsContext()

  const observeRef = useRef<HTMLDivElement>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [comments, setComments] = useState<CommentsType[]>([])
  const [nextCursorId, setNextCursorId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { observe, isScrolled } = useIntersectionObserver()

  const handleClose = () => {
    modalStatus.setIsOpen.call(null, false)
  }
  const fetchComments = async (firstFetch: boolean = false) => {
    if (cardId) {
      try {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 300))
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
      } finally {
        setIsLoading(false)
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

  const handlePopoverDelete = async () => {
    try {
      await deleteTaskCards(cardId)
      setTaskCards((prevCard) => {
        return prevCard.filter((card: TaskCardDataType) => card.id !== cardId)
      })
    } catch (error) {
      console.error('카드를 삭제하는 데 실패했습니다:', error)
    }
  }

  useEffect(() => {
    isModalOpen === false && setIsPopoverOpen(false)
  }, [isModalOpen])

  return (
    <div className={S.container}>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <ModalEdittodo cardData={cardData} setCardData={setTaskCards} />
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
            <ProgressChip progress={columnList[cardData.columnId]} />
            <Image src={BAR_ICON} alt="구분선" width={0} height={20} />
            <div className={S.tags}>
              {tags
                .filter((tag) => tag.length !== 0)
                .map((tag, index) => (
                  <TagChip key={index} index={index} text={tag} />
                ))}
            </div>
          </div>
          <p className={S.text}>{description}</p>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
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
              profileImageUrl={assignee?.profileImageUrl}
              nickname={assignee?.nickname}
              type="card"
              userId={assignee.id}
            />
          </div>
          <div
            className={`${S.dueDate} ${dueDate === EMPTY_DUEDATE ? S.hidden : ''}`}
          >
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
      <div className={S.spinnerWrapper}>{isLoading && <Spinner />}</div>
      {!isLoading && <div ref={observeRef} />}
    </div>
  )
}

export default ModalTask
