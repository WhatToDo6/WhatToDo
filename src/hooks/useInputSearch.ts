import { useState, ChangeEvent } from 'react'

type Data = {
  [key: string]: string
}

type UseInputSearch = [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Data[],
]

export function useInputSearch(list: Data[]): UseInputSearch {
  const [searchWord, setSearchWord] = useState('')

  const handleWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }

  const searchedData = list.filter((item) => item.name.includes(searchWord))

  return [searchWord, handleWordChange, searchedData]
}
