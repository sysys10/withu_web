import axios from 'axios'

export const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// axiosPrivate.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config
//     if (error.response.status === 401 && !originalRequest._retry) {
//     originalRequest._retry = true
//     try {
//         const { data } = await axiosPublic.post('/api/auth/refresh')
//         return axiosPrivate(originalRequest)
//       } catch (error) {
//         return Promise.reject(error)
//       }
//     }
//     return Promise.reject(error)
//   }
// )
