import { useRouter } from 'next/router'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'

import {
  fetchGetDashboardDetail,
  fetchGetDashboardListInfinite,
} from '@/pages/api/dashboards'

import { usePagination } from '../hooks/usePagination'
import { ChildrenProps } from '../types/commonType'
import { DashboardType } from '../types/mydashboard'
import { PaginationContextType } from '../types/mydashboard'

interface DashboardContextType<T> extends PaginationContextType<T> {
  dashboardDetail: DashboardType | null
  setDashboardDetail: Dispatch<SetStateAction<DashboardType | null>>
  sideMenuDashboards: DashboardType[]
  getSideMenuDashboards: (firstFetch?: boolean) => Promise<void>
  editSideMenuDashboards: (dashboard: DashboardType) => void
  selectedDashboard: string
  setSelectedDashboard: Dispatch<SetStateAction<string>>
}

export const DashboardsContext = createContext<
  DashboardContextType<DashboardType>
>({
  pageData: [],
  currPage: 1,
  lastPage: 1,
  onClickPrevPage: () => {},
  onClickNextPage: () => {},
  updateData: () => {},
  dashboardDetail: null,
  setDashboardDetail: () => {},
  sideMenuDashboards: [],
  getSideMenuDashboards: async (firstFetch?: boolean): Promise<void> => {},
  editSideMenuDashboards: () => {},
  selectedDashboard: '',
  setSelectedDashboard: () => {},
})

function DashboardsProvider({ children }: ChildrenProps) {
  const {
    query: { id },
  } = useRouter()
  const dashboardId = typeof id === 'string' ? +id : 0

  const [dashboards, setDashboards] = useState<DashboardType[]>([])
  const [dashboardDetail, setDashboardDetail] = useState<DashboardType | null>(
    null,
  )
  const [sideMenuDashboards, setSideMenuDashboards] = useState<DashboardType[]>(
    [],
  )
  const [selectedDashboard, setSelectedDashboard] = useState('')

  const [currCursorId, setCurrCursorId] = useState(0)

  const getDashboardDetail = async (dashboardId: number) => {
    try {
      const dashboard = await fetchGetDashboardDetail(dashboardId)
      setDashboardDetail(dashboard)
    } catch (err) {
      console.error(err)
    }
  }

  const getSideMenuDashboards = async (firstFetch: boolean = false) => {
    try {
      const { data: dashboards, cursorId } =
        await fetchGetDashboardListInfinite(15, currCursorId)
      setSideMenuDashboards((prev) =>
        firstFetch ? dashboards : [...prev, ...dashboards],
      )
      setCurrCursorId(cursorId)
    } catch (err) {
      console.error(err)
    }
  }

  const editSideMenuDashboards = (dashboard: DashboardType) => {
    const id = dashboard.id
    let newState: DashboardType[]
    newState = sideMenuDashboards.map((el) => {
      if (el.id === id) return (el = dashboard)
      return el
    })
    setSideMenuDashboards(newState)
  }

  const {
    pageData,
    currPage,
    lastPage,
    onClickPrevPage,
    onClickNextPage,
    updateData,
  } = usePagination<DashboardType>(
    5,
    'dashboard',
    dashboards,
    setDashboards,
    dashboardId,
  )

  useEffect(() => {
    if (dashboardId) {
      getDashboardDetail(dashboardId)
    }
  }, [id])

  useEffect(() => {
    getSideMenuDashboards(true)
  }, [])

  return (
    <DashboardsContext.Provider
      value={{
        pageData,
        currPage,
        lastPage,
        onClickPrevPage,
        onClickNextPage,
        updateData,
        dashboardDetail,
        setDashboardDetail,
        sideMenuDashboards,
        getSideMenuDashboards,
        editSideMenuDashboards,
        selectedDashboard,
        setSelectedDashboard,
      }}
    >
      {children}
    </DashboardsContext.Provider>
  )
}

export default DashboardsProvider
