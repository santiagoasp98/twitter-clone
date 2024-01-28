import { Box, Avatar, Typography, Button, Theme } from '@mui/material'
import { User } from '../types/auth'

import profilePic from '../assets/profile-picture.jpeg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import {
  checkFollowing,
  handleFollow,
  handleUnfollow,
} from '../utils/followersUtils'

interface UserCardProps {
  user: User
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { user: userLoggedIn, token } = useAuth()
  const navigate = useNavigate()

  const [isFollowing, setIsFollowing] = useState(false)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      if (userLoggedIn && user) {
        const result = await checkFollowing(userLoggedIn, user)
        setIsFollowing(result)
      }
    }

    fetchFollowingStatus()
  }, [userLoggedIn, user])

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
          isFollowing
            ? handleUnfollow(user.id, userLoggedIn, token, () =>
                setIsFollowing(false),
              )
            : handleFollow(user.id, userLoggedIn, token, () =>
                setIsFollowing(true),
              )
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
