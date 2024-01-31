import { Box, Avatar, Typography, Theme } from '@mui/material'
import { User } from '@myTypes/auth'

import profilePic from '@assets/profile-picture.jpeg'
import { useNavigate } from 'react-router-dom'
import { UserFollow } from '@myTypes/follower'

interface UserCardProps {
  user: User | UserFollow
  withBio?: boolean
  close?: () => void
}

export const UserCard: React.FC<UserCardProps> = ({ user, withBio, close }) => {
  const navigate = useNavigate()

  return (
    <Box
      onClick={() => {
        if (close) {
          close()
        }
        navigate(`/${user.username}`)
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 'auto',
        height: '60px',
        marginBottom: '10px',
        flex: 1,
        p: 1,
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
          alignItems: 'flex-start',
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
          {withBio && <Typography variant="body1">{user.bio}</Typography>}
        </Box>
      </Box>
    </Box>
  )
}
