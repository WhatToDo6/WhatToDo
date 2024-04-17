import Image from 'next/image'

import arrowLeft from '@/public/images/small-arrow-left.png'
import arrowRight from '@/public/images/small-arrow-right.png'

import S from './PagenationButton.module.scss'

interface PagenationButtonProps {
  currPage: number
  lastPage: number
  onClickLeft: () => void
  onClickRight: () => void
}

function PagenationButton({
  currPage,
  lastPage,
  onClickLeft,
  onClickRight,
}: PagenationButtonProps) {
  return (
    <div className={S.container}>
      <p>
        {currPage} 페이지 중 {lastPage}
      </p>
      <div className={S.btnContainer}>
        <button onClick={onClickLeft}>
          <Image width={16} height={16} src={arrowLeft} alt="이전" />
        </button>
        <button onClick={onClickRight}>
          <Image width={16} height={16} src={arrowRight} alt="다음" />
        </button>
      </div>
    </div>
  )
}

export default PagenationButton
