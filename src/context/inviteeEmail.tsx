import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'

import { usePagination } from '../hooks/usePagination'
import { ChildrenProps } from '../types/common'
import { InvitedListEmailType } from '../types/mydashboard'
import { PaginationContextType } from '../types/mydashboard'

interface PagenationInviteeEmailType<T> extends PaginationContextType<T> {
  handleDelete: () => void
  handleCreate: () => void
}

export const InviteeEmailContext = createContext<
  PagenationInviteeEmailType<InvitedListEmailType>
>({
  pageData: [],
  currPage: 1,
  lastPage: 1,
  onClickPrevPage: () => {},
  onClickNextPage: () => {},
  updateData: () => {},
  handleDelete: () => {},
  handleCreate: () => {},
})

function InviteeEmailProvider({ children }: ChildrenProps) {
  const {
    query: { id },
  } = useRouter()
  const dashboardId = typeof id === 'string' ? +id : 0
  const [invitee, setInvitee] = useState<InvitedListEmailType[]>([])

  const {
    pageData,
    currPage,
    lastPage,
    onClickPrevPage,
    onClickNextPage,
    updateData,
    setLastPage,
    setCurrPage,
  } = usePagination<InvitedListEmailType>(
    5,
    'email',
    invitee,
    setInvitee,
    dashboardId,
  )

  const handleDelete = () => {
    updateData(currPage)
  }

  const handleCreate = () => {
    updateData(1)
    setCurrPage(1)
  }

  useEffect(() => {
    if (invitee.length === 0 && currPage >= 1 && lastPage >= 1) {
      if (currPage === 1 && lastPage === 1) return
      setCurrPage(currPage - 1)
      setLastPage(lastPage - 1)
      updateData(currPage - 1)
    }
  }, [invitee.length])

  return (
    <InviteeEmailContext.Provider
      value={{
        pageData,
        currPage,
        lastPage,
        onClickPrevPage,
        onClickNextPage,
        updateData,
        handleDelete,
        handleCreate,
      }}
    >
      {children}
    </InviteeEmailContext.Provider>
  )
}

export default InviteeEmailProvider
