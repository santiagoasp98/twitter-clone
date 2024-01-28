import {
  followUserRequest,
  isFollowingRequest,
  unfollowUserRequest,
} from '../api/followers'
import { User } from '../types/auth'
import { Follower } from '../types/follower'

export const checkFollowing = async (userLoggedIn: User, user: User) => {
  if (userLoggedIn && user) {
    const followData: Follower = {
      followerId: userLoggedIn.id,
      followingId: user.id,
    }
    try {
      const result = await isFollowingRequest(followData)
      return result.data
    } catch (error) {
      console.log(error)
    }
  }
}

export const handleFollow = async (
  userToFollow: string,
  userLoggedIn: User | null,
  token: string,
  setFollowing: () => void,
) => {
  if (userLoggedIn) {
    const followData: Follower = {
      followerId: userLoggedIn.id,
      followingId: userToFollow,
    }
    try {
      await followUserRequest(followData, token)
      setFollowing()
    } catch (error) {
      console.log(error)
    }
  }
}

export const handleUnfollow = async (
  userToUnfollow: string,
  userLoggedIn: User | null,
  token: string,
  setIsNotFollowing: () => void,
) => {
  if (userLoggedIn) {
    const unfollowData: Follower = {
      followerId: userLoggedIn.id,
      followingId: userToUnfollow,
    }
    try {
      await unfollowUserRequest(unfollowData, token)
      setIsNotFollowing()
    } catch (error) {
      console.log(error)
    }
  }
}
