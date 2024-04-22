import { useState, ChangeEvent } from 'react'

import { InvitedListDashboardType } from '@/src/types/mydashboard'

export function useInputSearch(list: InvitedListDashboardType[]) {
  const [searchWord, setSearchWord] = useState('')

  const handleWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }

  const searchedData = list.filter((item) => {
    const title = item.dashboard.title
    return title.includes(searchWord)
  })

  return { searchWord, handleWordChange, searchedData }
}
