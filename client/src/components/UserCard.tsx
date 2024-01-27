import { Box, Avatar, Typography, Button, Theme } from '@mui/material'
import { User } from '../types/auth'

import profilePic from '../assets/profile-picture.jpeg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {
  followUserRequest,
  isFollowingRequest,
  unfollowUserRequest,
} from '../api/followers'
import { Follower } from '../types/follower'
import { useEffect, useState } from 'react'

interface UserCardProps {
  user: User
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { user: userLoggedIn, token } = useAuth()
  const navigate = useNavigate()

  const [isFollowing, setIsFollowing] = useState(false)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const checkFollowing = async () => {
      if (userLoggedIn) {
        const followData: Follower = {
          followerId: userLoggedIn.id,
          followingId: user.id,
        }
        try {
          const result = await isFollowingRequest(followData)
          setIsFollowing(result.data)
        } catch (error) {
          console.log(error)
        }
      }
    }
    checkFollowing()
  }, [userLoggedIn, user])

  const handleFollow = async (userToFollow: string) => {
    if (userLoggedIn) {
      const followData: Follower = {
        followerId: userLoggedIn.id,
        followingId: userToFollow,
      }
      try {
        await followUserRequest(followData, token)
        setIsFollowing(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleUnfollow = async (userToUnfollow: string) => {
    if (userLoggedIn) {
      const unfollowData: Follower = {
        followerId: userLoggedIn.id,
        followingId: userToUnfollow,
      }
      try {
        await unfollowUserRequest(unfollowData, token)
        setIsFollowing(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Box
      onClick={() => {
        navigate(`/${user.username}`)
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 'auto',
        height: '60px',
        marginBottom: '10px',
        '&:hover': {
          cursor: 'pointer',
          bgcolor: (theme: Theme) => theme.myPalette.darkGreyShadow,
        },
        transition: 'background-color 0.3s ease',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Avatar src={profilePic} sx={{ marginRight: '10px', ml: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 'bold',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {user.fullname}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: (theme: Theme) => theme.myPalette.greyFont }}
          >
            @{user.username}
          </Typography>
        </Box>
      </Box>
      <Button
        onClick={(event) => {
          event.stopPropagation()
          isFollowing ? handleUnfollow(user.id) : handleFollow(user.id)
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        variant="contained"
        sx={{
          color: 'black',
          bgcolor: isFollowing ? 'grey' : 'white',
          borderRadius: '20px',
          mr: 2,
          '&:hover': {
            bgcolor: isFollowing ? 'lightgrey' : 'white',
          },
        }}
      >
        {isFollowing ? (hover ? 'Unfollow' : 'Following') : 'Follow'}
      </Button>
    </Box>
  )
}
