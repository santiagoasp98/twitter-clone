import { Follower } from '../types/follower'
import axiosInstance from './axios'

const BASE_URL = '/followers'

export const followUserRequest = (followData: Follower, token: string) =>
  axiosInstance.post(`${BASE_URL}/follow`, followData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const unfollowUserRequest = (unfollowData: Follower, token: string) =>
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

export const isFollowingRequest = (followData: Follower) =>
  axiosInstance.post(`${BASE_URL}/isFollowing`, followData)
