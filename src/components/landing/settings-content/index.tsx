import Image from 'next/image'

import { SECTIONS } from './constants'
import S from './SettingsContent.module.scss'

const SettingsContent = () => {
  return (
    <div className={S.container}>
      <article>
        <p className={S.title}>생산성을 높이는 다양한 설정 ⚡</p>
        <div className={S.items}>
          {SECTIONS.map((section, index) => {
            return (
              <section key={index}>
                <div className={S.img}>
                  <Image
                    className={S[`img${index + 1}`]}
                    src={section.imgSrc}
                    alt={section.title}
                    width={section.width}
                    height={section.height}
                  />
                </div>
                <div className={S.text}>
                  <h2 className={S.subtitle}>{section.title}</h2>
                  <p className={S.description}>{section.description}</p>
                </div>
              </section>
            )
          })}
        </div>
      </article>
    </div>
  )
}

export default SettingsContent
