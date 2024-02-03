import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://www.twitter-clone-server-olive.vercel.app/', // or http://localhost:3000
  withCredentials: true,
})

export default axiosInstance
