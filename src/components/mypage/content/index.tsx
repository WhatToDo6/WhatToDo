import S from './Content.module.scss'
import BackButton from '../../common/back-button/BackButton'
import Password from '../password'
import Profile from '../profile'

const Content = () => {
  return (
    <div className={S.container}>
      <BackButton />
      <Profile />
      <Password />
    </div>
  )
}

export default Content
