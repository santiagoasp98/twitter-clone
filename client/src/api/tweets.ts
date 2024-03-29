import { CreateTweet, UpdateTweet } from '@myTypes/tweet'
import axiosInstance from '@api/axios'

const BASE_URL = '/tweets'

export const createTweetRequest = (tweetData: CreateTweet, token: string) =>
  axiosInstance.post(`${BASE_URL}/create`, tweetData, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const getTweetsFromUser = (userId: string) =>
  axiosInstance.get(`${BASE_URL}/${userId}`)

export const updateTweetRequest = (
  tweetId: string,
  tweetData: UpdateTweet,
  token: string,
) =>
  axiosInstance.post(`${BASE_URL}/update/${tweetId}`, tweetData, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const deleteTweetRequest = (tweetId: string, token: string) =>
  axiosInstance.delete(`${BASE_URL}/delete/${tweetId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const likeTweetRequest = (
  tweetId: string,
  userId: string,
  token: string,
) =>
  axiosInstance.post(
    `${BASE_URL}/like/${tweetId}`,
    { userId },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

export const unlikeTweetRequest = (
  tweetId: string,
  userId: string,
  token: string,
) =>
  axiosInstance.post(
    `${BASE_URL}/unlike/${tweetId}`,
    { userId },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

export const getFeedForUserRequest = (userId: string, token: string) =>
  axiosInstance.get(`${BASE_URL}/feed/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
