import { createContext, useState } from 'react'

import { usePagination } from '../hooks/usePagination'
import { ChildrenProps } from '../types/commonType'
import { DashboardType } from '../types/mydashboard'
import { PaginationContextType } from '../types/mydashboard'

export const DashboardsContext = createContext<
  PaginationContextType<DashboardType>
>({
  pageData: [],
  currPage: 1,
  lastPage: 1,
  onClickPrevPage: () => {},
  onClickNextPage: () => {},
  updateData: () => {},
})

function DashboardsProvider({ children }: ChildrenProps) {
  const [dashboards, setDashboards] = useState<DashboardType[]>([])

  const {
    pageData,
    currPage,
    lastPage,
    onClickPrevPage,
    onClickNextPage,
    updateData,
  } = usePagination<DashboardType>(5, 'dashboard', dashboards, setDashboards)

  return (
    <DashboardsContext.Provider
      value={{
        pageData,
        currPage,
        lastPage,
        onClickPrevPage,
        onClickNextPage,
        updateData,
      }}
    >
      {children}
    </DashboardsContext.Provider>
  )
}

export default DashboardsProvider
