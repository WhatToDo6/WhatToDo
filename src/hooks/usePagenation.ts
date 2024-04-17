import { useRef, useState, useEffect } from 'react'

interface usePagenationProps {
  [key: string]: string
}

type usePageNation = {
  currPage: number
  lastPage: number
  currPageData: usePagenationProps[]
  onClickNextPage: () => void
  onClickPrevPage: () => void
}

export function usePagenation(
  initialData: usePagenationProps[],
  visibleDataNum: number,
): usePageNation {
  const currPageRef = useRef(1)
  const [currPageData, setCurrPageData] = useState<usePagenationProps[]>(
    initialData.slice(0, visibleDataNum),
  )
  const lastPage = Math.ceil(initialData.length / visibleDataNum)

  const onClickNextPage = () => {
    if (currPageRef.current < lastPage) {
      currPageRef.current += 1
      setCurrPageData(getPageData(currPageRef.current))
    }
  }

  const onClickPrevPage = () => {
    if (currPageRef.current > 1) {
      currPageRef.current -= 1
      setCurrPageData(getPageData(currPageRef.current))
    }
  }

  const getPageData = (page: number): usePagenationProps[] => {
    const startIdx = (page - 1) * visibleDataNum
    const endIdx = startIdx + visibleDataNum
    return initialData.slice(startIdx, endIdx)
  }

  useEffect(() => {
    setCurrPageData(getPageData(currPageRef.current))
  }, [currPageRef.current, initialData, visibleDataNum])

  return {
    currPage: currPageRef.current,
    lastPage,
    currPageData,
    onClickPrevPage,
    onClickNextPage,
  }
}
