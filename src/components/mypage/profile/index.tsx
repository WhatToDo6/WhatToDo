import Image from 'next/image'

import S from './Profile.module.scss'
import BorderButton from '../../common/button/border'
import Input from '../input'

import ADD_IMG from '/public/icons/add-img.svg'

const Profile = () => {
  return (
    <div className={S.container}>
      <h1 className={S.title}>프로필</h1>
      <div className={S.items}>
        <div className={S['img-container']}>
          <Image src={ADD_IMG} alt="이미지 추가하기" width={30} height={30} />
        </div>
        <form className={S.form}>
          <Input
            label="이메일"
            size="small"
            placeholder="이메일 추가 예정"
            isDisabled={true}
          />
          <Input
            label="닉네임"
            size="small"
            helperText="닉네임을 입력해주세요"
          />
        </form>
      </div>
      <div className={S['button-container']}>
        <BorderButton size="small" color="purple">
          저장
        </BorderButton>
      </div>
    </div>
  )
}

export default Profile
