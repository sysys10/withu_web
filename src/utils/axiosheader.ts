import { axiosPrivate } from '@/api/axiosInstance'

const setAxiosHeader = (token: string) => {
  axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const getAxiosHeader = () => {
  return axiosPrivate.defaults.headers.common['Authorization']
}

export { setAxiosHeader, getAxiosHeader }
