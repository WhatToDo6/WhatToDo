import Layout from '@/src/components/common/layout'
import Content from '@/src/components/mypage/content'
import Toast from '@/src/components/toast'
import { ToastProvider } from '@/src/context/toast'

const MyPage = () => {
  return (
    <ToastProvider>
      <Layout>
        <Content />
      </Layout>
      <Toast />
    </ToastProvider>
  )
}

export default MyPage
