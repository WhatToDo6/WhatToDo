import Image from 'next/image'
import Link from 'next/link'

import { LINK, SNS } from './constants'
import S from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={S.container}>
      <p className={S.copyright}>©codeit - 2023</p>
      <div className={S.links}>
        {LINK.map((link) => {
          return (
            <Link key={link.id} href={link.link} className={S.link}>
              {link.name}
            </Link>
          )
        })}
      </div>
      <div className={S.icons}>
        {SNS.map((sns) => {
          return (
            <Link key={sns.id} href={sns.link}>
              <Image src={sns.src} alt={sns.name} width={22} height={22} />
            </Link>
          )
        })}
      </div>
    </footer>
  )
}

export default Footer
