import { CreateUserDto, UserLoginDto, UserUpdateDto } from '@myTypes/auth'
import axiosInstance from '@api/axios'

const BASE_URL = '/auth'

export const getUserRequest = (username: string) =>
  axiosInstance.get(`${BASE_URL}/${username}`)

export const getUsersRequest = (excludedId: string, access_token: string) =>
  axiosInstance.get(`${BASE_URL}/users/${excludedId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

export const registerRequest = (newUser: CreateUserDto) =>
  axiosInstance.post(`${BASE_URL}/register`, newUser)

export const loginRequest = (userData: UserLoginDto) =>
  axiosInstance.post(`${BASE_URL}/login`, userData)

export const logoutRequest = (access_token: string) =>
  axiosInstance.post(
    `${BASE_URL}/logout`,
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
  axiosInstance.patch(`${BASE_URL}/${id}`, userData, {
    headers: { Authorization: `Bearer ${access_token}` },
  })

export const verifyTokenRequest = (access_token: string) =>
  axiosInstance.post(
    `${BASE_URL}/verify`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  )

// ! delete
