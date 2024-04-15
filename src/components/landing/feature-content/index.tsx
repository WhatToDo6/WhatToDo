import Image from 'next/image'

import S from './FeatureContent.module.scss'

import CONTENT_IMG1 from '/public/images/landing-img1.png'
import CONTENT_IMG2 from '/public/images/landing-img2.png'
const FeatureContent = () => {
  return (
    <article className={S.container}>
      <section className={`${S.items} ${S.item1}`}>
        <div className={`${S.text} ${S.first}`}>
          <p className={S.point}>Point 1</p>
          <h1 className={S.description}>
            일의 우선순위를
            <br /> 관리하세요
          </h1>
        </div>
        <div className={S.img1}>
          <Image
            className={S.imgSize1}
            src={CONTENT_IMG1}
            alt="대시보드"
            width={594}
            height={497}
          />
        </div>
      </section>
      <section className={`${S.items} ${S.item2}`}>
        <div className={S.img2}>
          <Image
            className={S.imgSize2}
            src={CONTENT_IMG2}
            alt="할 일 생성"
            width={436}
            height={502}
          />
        </div>
        <div className={`${S.text} ${S.second}`}>
          <p className={S.point}>Point 2</p>
          <h1 className={S.description}>
            해야 할 일을
            <br /> 등록하세요
          </h1>
        </div>
      </section>
    </article>
  )
}

export default FeatureContent
