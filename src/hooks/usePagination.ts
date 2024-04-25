import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import {
  fetchGetDashboardList,
  fetchGetInviteeEmailList,
} from '@/pages/api/dashboards'
import { fetchGetDashboardMemberList } from '@/pages/api/members'

type PagenationType = 'dashboard' | 'email' | 'member'

export function usePagination<T>(
  visibleDataNum: number,
  type: PagenationType,
  pageData: T[],
  setPageData: Dispatch<SetStateAction<T[]>>,
  dashboardId?: number,
) {
  const { pathname } = useRouter()

  const [currPage, setCurrPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const getDashboards = async (page: number) => {
    try {
      const response = await fetchGetDashboardList<T>(page, visibleDataNum)
      const { data: dashboards, totalCount } = response
      setPageData(dashboards)
      const lastPage = Math.ceil(totalCount / visibleDataNum)
      setLastPage(lastPage === 0 ? 1 : lastPage)
    } catch (err) {
      console.error(err)
    }
  }
  const getEmails = async (page: number) => {
    if (dashboardId)
      try {
        const response = await fetchGetInviteeEmailList<T>(
          page,
          dashboardId,
          visibleDataNum,
        )
        const { data: invitations, totalCount } = response
        setPageData(invitations)
        const lastPage = Math.ceil(totalCount / visibleDataNum)
        setLastPage(lastPage === 0 ? 1 : lastPage)
      } catch (err) {
        console.error(err)
      }
  }
  const getMembers = async (page: number) => {
    if (dashboardId)
      try {
        const response = await fetchGetDashboardMemberList<T>(
          page,
          dashboardId,
          visibleDataNum,
        )
        const { data: members, totalCount } = response
        setPageData(members)
        const lastPage = Math.ceil(totalCount / visibleDataNum)
        setLastPage(lastPage === 0 ? 1 : lastPage)
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

  const updateData = (page: number) => {
    GET_DATA[type](page)
  }

  useEffect(() => {
    if (type === 'dashboard' || type === 'member') updateData(1)
  }, [])

  useEffect(() => {
    if (pathname === '/dashboards/[id]/edit' && type === 'email') {
      updateData(1)
    }
  }, [])

  return {
    currPage,
    pageData,
    updateData,
    setPageData,
    lastPage,
    onClickPrevPage,
    onClickNextPage,
    setLastPage,
    setCurrPage,
  }
}
