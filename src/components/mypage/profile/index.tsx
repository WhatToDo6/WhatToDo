import S from './Profile.module.scss'
import ProfileForm from '../profile-form'

const Profile = () => {
  return (
    <div className={S.container}>
      <h1 className={S.title}>프로필</h1>
      <ProfileForm />
    </div>
  )
}

export default Profile
