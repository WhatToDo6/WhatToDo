import Button from '../../button'
import LogInInput from '../../input/login'
import S from '../Form.module.scss'

const LogInForm = () => {
  return (
    <form className={S.container}>
      <label className={S.label}>이메일</label>
      <LogInInput inputType="email" error={false} />
      <label className={S.label}>비밀번호</label>
      <LogInInput inputType="password" error={false} />
      <Button>
        <span className={S.buttonText}>로그인</span>
      </Button>
    </form>
  )
}

export default LogInForm
