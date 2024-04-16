import S from './ColumnHeader.module.scss'

const ColumnHeader = () => {
  return (
    <header className={S.wrapper}>
      <div className={S.ellipse} />
      <div>To Do</div>
      <div>3</div>
      <div>톱니바퀴</div>
    </header>
  )
}

export default ColumnHeader
