import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'

import { fetchGetDashboardMemberList } from '@/pages/api/members'

import { usePagination } from '../hooks/usePagination'
import { ChildrenProps } from '../types/commonType'
import { InvitedMemberType } from '../types/mydashboard'
import { PaginationContextType } from '../types/mydashboard'

interface PagenationMembersType<T> extends PaginationContextType<T> {
  handleDelete: () => void
  handleCreate: () => void
  headerMembers: InvitedMemberType[]
}

export const MembersContext = createContext<
  PagenationMembersType<InvitedMemberType>
>({
  pageData: [],
  currPage: 1,
  lastPage: 1,
  onClickPrevPage: () => {},
  onClickNextPage: () => {},
  updateData: () => {},
  handleDelete: () => {},
  handleCreate: () => {},
  headerMembers: [],
})

function MembersProvider({ children }: ChildrenProps) {
  const {
    query: { id },
  } = useRouter()
  const dashboardId = typeof id === 'string' ? +id : 0
  const [headerMembers, setHeaderMembers] = useState<InvitedMemberType[]>([])
  const [members, setMembers] = useState<InvitedMemberType[]>([])

  const {
    pageData,
    currPage,
    lastPage,
    onClickPrevPage,
    onClickNextPage,
    updateData,
    setLastPage,
    setCurrPage,
  } = usePagination<InvitedMemberType>(
    4,
    'member',
    members,
    setMembers,
    dashboardId,
  )

  const getHeaderMembersData = async (dashboardId: number) => {
    try {
      const response = await fetchGetDashboardMemberList<InvitedMemberType>(
        1,
        dashboardId,
        20,
      )
      const { data: members } = response
      setHeaderMembers(members)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = () => {
    updateData(currPage)
    getHeaderMembersData(dashboardId)
  }

  const handleCreate = () => {
    updateData(1)
    setCurrPage(1)
  }

  useEffect(() => {
    if (dashboardId) getHeaderMembersData(dashboardId)
  }, [])

  useEffect(() => {
    if (members.length === 0 && currPage >= 1 && lastPage >= 1) {
      if (currPage === 1 && lastPage === 1) return
      setCurrPage(currPage - 1)
      setLastPage(lastPage - 1)
      updateData(currPage - 1)
    }
  }, [members.length])

  return (
    <MembersContext.Provider
      value={{
        pageData,
        currPage,
        lastPage,
        onClickPrevPage,
        onClickNextPage,
        updateData,
        handleDelete,
        handleCreate,
        headerMembers,
      }}
    >
      {children}
    </MembersContext.Provider>
  )
}

export default MembersProvider
