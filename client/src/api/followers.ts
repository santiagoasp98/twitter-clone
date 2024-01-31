import { Follow } from '@myTypes/follower'
import axiosInstance from '@api/axios'

const BASE_URL = '/followers'

export const followUserRequest = (followData: Follow, token: string) =>
  axiosInstance.post(`${BASE_URL}/follow`, followData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const unfollowUserRequest = (unfollowData: Follow, token: string) =>
  axiosInstance.post(`${BASE_URL}/unfollow`, unfollowData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const getFollowersRequest = (userId: string, token: string) =>
  axiosInstance.get(`${BASE_URL}/${userId}/followers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const getFollowingRequest = (userId: string, token: string) =>
  axiosInstance.get(`${BASE_URL}/${userId}/following`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const isFollowingRequest = (followData: Follow) =>
  axiosInstance.post(`${BASE_URL}/isFollowing`, followData)
