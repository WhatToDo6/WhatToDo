import { useEffect, useState } from 'react'

import AXIOS from '@/lib/axios'

type PagenationType = 'dashboard' | 'email' | 'member'

export function usePagenation<T>(
  visibleDataNum: number,
  type: PagenationType,
  dashboardId?: number,
) {
  const [currPage, setCurrPage] = useState(1)
  const [lastPage, setLastpage] = useState(1)
  const [pageData, setPageData] = useState<T[]>([])

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
      const { dashboards, totalCount } = data
      setPageData(dashboards)
      const lastPage = Math.ceil(totalCount / visibleDataNum)
      setLastpage(lastPage === 0 ? 1 : lastPage)
    } catch (err) {
      console.error(err)
    }
  }
  const getEmails = async (page: number) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await AXIOS.get(
        `/dashboards/${dashboardId}/invitations?&page=${page}&size=${visibleDataNum}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const { data } = response
      const { invitations, totalCount } = data
      setPageData(invitations)
      const lastPage = Math.ceil(totalCount / visibleDataNum)
      setLastpage(lastPage === 0 ? 1 : lastPage)
    } catch (err) {
      console.error(err)
    }
  }
  const getMembers = async (page: number) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await AXIOS.get(
        `/members?page=${page}&size=${visibleDataNum}&dashboardId=${dashboardId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const { data } = response
      const { members, totalCount } = data
      setPageData(members)
      const lastPage = Math.ceil(totalCount / visibleDataNum)
      setLastpage(lastPage === 0 ? 1 : lastPage)
    } catch (err) {
      console.error(err)
    }
  }

  const GET_DATA = {
    dashboard: (page: number) => getDashboards(page),
    email: (page: number) => getEmails(page),
    member: (page: number) => getMembers(page),
  }

  const onClickPrevPage = () => {
    if (currPage > 1) {
      setCurrPage((page) => {
        const prevPage = page - 1
        GET_DATA[type](prevPage)
        return prevPage
      })
    }
  }

  const onClickNextPage = () => {
    if (currPage < lastPage) {
      setCurrPage((page) => {
        const nextPage = page + 1
        GET_DATA[type](nextPage)
        return nextPage
      })
    }
  }

  useEffect(() => {
    GET_DATA[type](1)
  }, [])

  return {
    currPage,
    pageData,
    lastPage,
    onClickPrevPage,
    onClickNextPage,
  }
}
