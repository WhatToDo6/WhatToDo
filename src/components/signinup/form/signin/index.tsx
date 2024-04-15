import Button from '../../button'
import SignInInput from '../../input/signin'
import S from '../Form.module.scss'

const SignInForm = () => {
  return (
    <form className={S.container}>
      <label className={S.label}>이메일</label>
      <SignInInput inputType="email" error={false} />
      <label className={S.label}>비밀번호</label>
      <SignInInput inputType="password" error={false} />
      <Button>
        <span className={S.buttonText}>로그인</span>
      </Button>
    </form>
  )
}

export default SignInForm
