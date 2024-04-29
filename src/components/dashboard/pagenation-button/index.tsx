import Image from 'next/image'

import arrowLeft from '@/public/images/small-arrow-black-left.png'
import arrowRight from '@/public/images/small-arrow-black-right.png'
import arrowBlockLeft from '@/public/images/small-arrow-left.png'
import arrowBlockRight from '@/public/images/small-arrow-right.png'

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
  const leftButtonSrc = currPage === 1 ? arrowBlockLeft : arrowLeft
  const RightButtonSrc = currPage === lastPage ? arrowBlockRight : arrowRight

  return (
    <div className={S.container}>
      <p>
        {lastPage} 페이지 중 {currPage}
      </p>
      <div className={S.btnContainer}>
        <button onClick={onClickLeft}>
          <Image
            className={S.img}
            width={16}
            height={16}
            src={leftButtonSrc}
            alt="이전"
          />
        </button>
        <button onClick={onClickRight}>
          <Image width={16} height={16} src={RightButtonSrc} alt="다음" />
        </button>
      </div>
    </div>
  )
}

export default PagenationButton
