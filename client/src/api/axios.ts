import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://twitter-clone-server-olive.vercel.app/', // or http://localhost:3000
  withCredentials: true,
})

export default axiosInstance
