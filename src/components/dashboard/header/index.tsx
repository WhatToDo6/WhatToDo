import S from './DashboardHeader.module.scss'

function DashboardHeader() {
  return (
    <div className={S.container}>
      <div className={S.title}>내 대시보드</div>
      <div className={S.right_box}>
        <div className={S.button_box}>
          <button>관리</button>
          <button>초대하기</button>
        </div>
        <div className={S.login_info_box}>
          <div className={S.image_box}>{/* <Image /> */}</div>
          <span>배유철</span>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
