import InviteListDashboard from './dashboard'
import InviteListEmail from './email'
import InviteListMember from './member'

type MockData = {
  [key: string]: string
}

type InvitedListType = 'dashboard' | 'member' | 'email'

interface InvitedListProps {
  inviteData: MockData[]
  type: InvitedListType
}

function InvitedList({ inviteData, type }: InvitedListProps) {
  const INVITED_LIST = {
    dashboard: <InviteListDashboard inviteData={inviteData} type="dashboard" />,
    email: <InviteListEmail inviteData={inviteData} type="email" />,
    member: <InviteListMember inviteData={inviteData} type="member" />,
  }

  return INVITED_LIST[type]
}

export default InvitedList
