import S from './Password.module.scss'
import BorderButton from '../../common/button/border'

const Password = () => {
  return (
    <div className={S.container}>
      <h1 className={S.title}>비밀번호 변경</h1>
      <div className={S.items}>
        <div className={S.item}>
          <p className={S.text}>현재 비밀번호</p>
          <input
            type="text"
            className={S.input}
            placeholder="현재 비밀번호 입력"
          />
        </div>
        <div className={S.item}>
          <p className={S.text}>새 비밀번호</p>
          <input
            type="text"
            className={S.input}
            placeholder="새 비밀번호 입력"
          />
        </div>
        <div className={S.item}>
          <p className={S.text}>새 비밀번호 확인</p>
          <input
            type="text"
            className={S.input}
            placeholder="새 비밀번호 입력"
          />
        </div>
      </div>
      <div className={S['button-container']}>
        <BorderButton size="small" color="purple">
          변경
        </BorderButton>
      </div>
    </div>
  )
}

export default Password
