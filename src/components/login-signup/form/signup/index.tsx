import Button from '../../button'
import SignUpInput from '../../input/signup'
import S from '../Form.module.scss'

const SignUpForm = () => {
  return (
    <form className={S.container}>
      <label className={S.label}>이메일</label>
      <SignUpInput inputType="email" error={false} />
      <label className={S.label}>닉네임</label>
      <SignUpInput inputType="nickname" error={false} />
      <label className={S.label}>비밀번호</label>
      <SignUpInput inputType="password" error={false} />
      <label className={S.label}>비밀번호 확인</label>
      <SignUpInput inputType="passwordCheck" error={false} />
      <div className={S.agreeBox}>
        <input
          className={S.agreeCheck}
          type="checkbox"
          id="agree"
          name="agree"
        />
        <label className={S.agreeText} htmlFor="agree">
          약관에 동의합니다.
        </label>
      </div>
      <Button>
        <span className={S.buttonText}>가입하기</span>
      </Button>
    </form>
  )
}

export default SignUpForm
