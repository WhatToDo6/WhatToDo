import { useForm } from 'react-hook-form'

import { InputFormValues } from '@/src/types/input'

import S from './Password.module.scss'
import BorderButton from '../../common/button/border'
import Input from '../../common/input'

const Password = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<InputFormValues>({ mode: 'onBlur' })

  return (
    <div className={S.container}>
      <h1 className={S.title}>비밀번호 변경</h1>
      <form className={S.form}>
        <div className={S.item}>
          <label className={S.label}>비밀번호</label>
          <Input
            inputType="password"
            placeholder="현재 비밀번호 입력"
            error={errors.password}
            register={register}
            size="large"
          />
        </div>
        <div className={S.item}>
          <label className={S.label}>새 비밀번호</label>
          <Input
            inputType="newPassword"
            placeholder="새 비밀번호 입력"
            error={errors.newPassword}
            register={register}
            currentPassword={watch('password')}
            size="large"
          />
        </div>
        <div className={S.item}>
          <label className={S.label}>새 비밀번호 확인</label>
          <Input
            inputType="newPasswordCheck"
            placeholder="새 비밀번호 입력"
            error={errors.newPasswordCheck}
            register={register}
            newPassword={watch('newPassword')}
            size="large"
          />
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
