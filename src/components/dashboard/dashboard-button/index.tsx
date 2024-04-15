import S from './dashboardButton.module.scss'

type MockData = {
  [key: string]: string
}

interface Props {
  dashboard?: MockData
}

function DashboardButton({ dashboard }: Props) {
  const btnClassName = `${S.btn} ${
    dashboard ? S.withDashboard : S.withoutDashboard
  }`

  if (!dashboard) {
    return (
      <button className={btnClassName}>
        <div>새로운 대시보드</div>
        <div>+</div>
      </button>
    )
  }

  return (
    <button className={btnClassName}>
      <div className={S.info_box}>
        <span>img1</span>
        <div>{dashboard.name}</div>
        <span>img2</span>
      </div>
      <div className={S.right_arrow}>{'>'}</div>
    </button>
  )
}

export default DashboardButton
