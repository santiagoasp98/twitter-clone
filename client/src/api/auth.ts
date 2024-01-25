import { CreateUserDto, UserLoginDto, UserUpdateDto } from '../types/auth'
import axiosInstance from './axios'

export const getUserRequest = (username: string) =>
  axiosInstance.get(`/auth/${username}`)

export const registerRequest = (newUser: CreateUserDto) =>
  axiosInstance.post('/auth/register', newUser)

export const loginRequest = (userData: UserLoginDto) =>
  axiosInstance.post('/auth/login', userData)

export const logoutRequest = (access_token: string) =>
  axiosInstance.post(
    '/auth/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  )

export const updateUserRequest = (
  id: string,
  userData: UserUpdateDto,
  access_token: string,
) =>
  axiosInstance.patch(`/auth/${id}`, userData, {
    headers: { Authorization: `Bearer ${access_token}` },
  })

export const verifyTokenRequest = (access_token: string) =>
  axiosInstance.post(
    '/auth/verify',
    {},
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  )

// ! delete
