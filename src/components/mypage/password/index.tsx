import { useState, FocusEventHandler } from 'react'

import S from './Password.module.scss'
import BorderButton from '../../common/button/border'
import Input from '../input'

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [newPwError, setNewPwError] = useState('')
  const [checkPwError, setCheckPwError] = useState('')

  const validateNewPassword = () => {
    if (currentPassword && currentPassword === newPassword) {
      setNewPwError('현재 비밀번호와 일치합니다.')
      return
    }
    if (newPassword.length < 8) {
      setNewPwError('8자 이상 입력해주세요.')
      return
    } else {
      setNewPwError('')
    }
  }

  const validateCheckPassword = () => {
    if (newPassword !== checkPassword) {
      setCheckPwError('비밀번호가 일치하지 않습니다')
    } else {
      setCheckPwError('')
    }
  }

  const handleNewPassword: FocusEventHandler<HTMLInputElement> = () => {
    validateNewPassword()
  }

  const handleCheckPassword: FocusEventHandler<HTMLInputElement> = () => {
    validateCheckPassword()
  }

  const isFormValid = !newPwError && !checkPwError

  const changePassword = () => {
    setCurrentPassword(newPassword)
  }
  const handleSubmit = () => {
    if (isFormValid) {
      changePassword()
    }
  }

  return (
    <div className={S.container}>
      <h1 className={S.title}>비밀번호 변경</h1>
      <form className={S.form}>
        <Input
          label="현재 비밀번호"
          placeholder="현재 비밀번호 입력"
          size="large"
          type="password"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Input
          label="새 비밀번호"
          placeholder="새 비밀번호 입력"
          size="large"
          type="password"
          hasError={!!newPwError}
          helperText={newPwError}
          onChange={(e) => setNewPassword(e.target.value)}
          onBlur={handleNewPassword}
        />
        <Input
          label="새 비밀번호 확인"
          placeholder="새 비밀번호 입력"
          size="large"
          type="password"
          hasError={!!checkPwError}
          helperText={checkPwError}
          onChange={(e) => setCheckPassword(e.target.value)}
          onBlur={handleCheckPassword}
        />
      </form>
      <div className={S['button-container']}>
        <BorderButton
          size="small"
          color="purple"
          onClick={handleSubmit}
          isDisabled={!isFormValid}
        >
          변경
        </BorderButton>
      </div>
    </div>
  )
}

export default Password
