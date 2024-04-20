import { useState, useEffect, useCallback } from 'react'

interface UseFetchDataResult<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

function useFetchData<T, P extends any[] = []>(
  apiFunction: (...params: P) => Promise<T>,
  params: P = [] as unknown as P,
): UseFetchDataResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await apiFunction(...params)
      setData(response)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [apiFunction, ...params])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, isLoading, error, refetch: fetchData }
}

export default useFetchData
