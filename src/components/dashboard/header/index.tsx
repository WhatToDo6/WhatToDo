import Image from 'next/image'

import addBoxIcon from '@/public/icons/add-box-icon.svg'
import settingIcon from '@/public/icons/setting-icon.svg'

import S from './DashboardHeader.module.scss'

const BUTTONS = [
  {
    tag: 'settingIcon',
    className: `${S.btn} ${S.settingBtn}`,
    size: 22,
    src: settingIcon,
    text: '관리',
  },
  {
    tag: 'addBoxIcon',
    className: `${S.btn} ${S.inviteBtn}`,
    size: 20,
    src: addBoxIcon,
    text: '초대하기',
  },
]

function DashboardHeader() {
  return (
    <div className={S.container}>
      <div className={S.title}>내 대시보드</div>
      <div className={S.rightBox}>
        <div className={S.btnBox}>
          {BUTTONS.map((btn) => (
            <button key={btn.tag} className={btn.className}>
              <Image
                className={S.btnImg}
                width={btn.size}
                height={btn.size}
                src={btn.src}
                alt={btn.tag}
              />
              <span>{btn.text}</span>
            </button>
          ))}
        </div>
        <div className={S.loginInfoBox}>
          <div className={S.imageBox}>{/* <Image /> */}</div>
          <span>배유철</span>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
