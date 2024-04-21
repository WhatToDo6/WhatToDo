import { useEffect, useState } from 'react'

import AXIOS from '@/lib/axios'
import { DashboardType } from '@/pages/mydashboard'

interface UsePagenationReturnType {
  currPage: number
  dashboards: DashboardType[]
  lastPage: number
  onClickPrevPage: () => void
  onClickNextPage: () => void
}

export function usePagenationTest(
  visibleDataNum: number,
): UsePagenationReturnType {
  const [currPage, setCurrPage] = useState(1)
  const [lastPage, setLastpage] = useState(1)
  const [dashboards, setDashboards] = useState<DashboardType[]>([])

  const getDashboards = async (page: number) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await AXIOS.get(
        `/dashboards?navigationMethod=pagination&cursorId=1&page=${page}&size=${visibleDataNum}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const { data } = response
      const { dashboards } = data
      setDashboards(dashboards)
    } catch (err) {
      console.error(err)
    }
  }

  const getFirstDashboards = async () => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await AXIOS.get(
        `/dashboards?navigationMethod=pagination&cursorId=1&page=1&size=${visibleDataNum}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const { data } = response
      const { dashboards, totalCount } = data
      setDashboards(dashboards)
      setLastpage(Math.ceil(totalCount / visibleDataNum))
    } catch (err) {
      console.error(err)
    }
  }

  const onClickPrevPage = () => {
    if (currPage > 1) {
      setCurrPage((page) => {
        const prevPage = page - 1
        getDashboards(prevPage)
        return prevPage
      })
    }
  }

  const onClickNextPage = () => {
    if (currPage < lastPage) {
      setCurrPage((page) => {
        const nextPage = page + 1
        getDashboards(nextPage)
        return nextPage
      })
    }
  }

  useEffect(() => {
    getFirstDashboards()
  }, [])

  return {
    currPage,
    dashboards,
    lastPage,
    onClickPrevPage,
    onClickNextPage,
  }
}
