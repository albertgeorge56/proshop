import apiClient from '@renderer/utils/api-client'
import { useEffect, useState } from 'react'

export const useFetch = <T,>(val: string) => {
  const [data, setdata] = useState<T | []>([])
  const [loading, setLoading] = useState<boolean>(false)
  const fetchData = async () => {
    setLoading(true)
    const res = await apiClient.get<{ data: T }>(val)
    setdata(res.data.data)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [val])
  return { data, setdata, loading, setLoading, refetch: fetchData }
}
