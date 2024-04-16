import Image from 'next/image'

import S from './Profile.module.scss'
import BorderButton from '../../common/button/border'

import ADD_IMG from '/public/icons/add-img.svg'

const Profile = () => {
  return (
    <div className={S.container}>
      <h1 className={S.title}>프로필</h1>
      <div className={S.items}>
        <div className={S['img-container']}>
          <Image src={ADD_IMG} alt="이미지 추가하기" width={30} height={30} />
        </div>
        <div className={S['item-container']}>
          <div className={S.item}>
            <p className={S.text}>이메일</p>
            <input
              type="text"
              className={S[`email-input`]}
              disabled
              placeholder="이메일 값 받아오면 추가하기"
            />
          </div>
          <div className={S.item}>
            <p className={S.text}>닉네임</p>
            <input type="text" className={S[`name-input`]} />
          </div>
        </div>
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
