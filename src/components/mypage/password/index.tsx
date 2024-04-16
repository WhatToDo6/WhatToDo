import S from './Password.module.scss'
import BorderButton from '../../common/button/border'
import Input from '../input'

const Password = () => {
  return (
    <div className={S.container}>
      <h1 className={S.title}>비밀번호 변경</h1>
      <form className={S.form}>
        <div className={S.item}>
          <label className={S.label}>현재 비밀번호</label>
          <Input placeholder="현재 비밀번호 입력" size="large" />
        </div>
        <div className={S.item}>
          <label className={S.label}>새 비밀번호</label>
          <Input placeholder="새 비밀번호 입력" size="large" />
        </div>
        <div className={S.item}>
          <label className={S.label}>새 비밀번호 확인</label>
          <Input placeholder="새 비밀번호 입력" size="large" />
        </div>
      </form>
      <div className={S['button-container']}>
        <BorderButton size="small" color="purple">
          변경
        </BorderButton>
      </div>
    </div>
  )
}

export default Password
