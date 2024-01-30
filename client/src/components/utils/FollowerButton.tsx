import { Button } from '@mui/material'
import {
  checkFollowing,
  handleFollow,
  handleUnfollow,
} from '../../utils/followersUtils'
import { User } from '../../types/auth'
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

interface FollowerButtonProps {
  user: User
  userLoggedIn: User | null
}

export const FollowerButton: React.FC<FollowerButtonProps> = ({
  user,
  userLoggedIn,
}) => {
  const { token } = useAuth()

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
        position: 'absolute',
        bottom: -45,
        left: '80%',
        color: isFollowing ? 'white' : 'black',
        bgcolor: isFollowing ? 'black' : 'white',
        border: isFollowing ? '1px solid white' : 'none',
        borderRadius: '20px',
        mr: 2,
        '&:hover': {
          bgcolor: isFollowing ? 'black' : 'white',
          color: isFollowing ? 'red' : 'default',
          borderColor: isFollowing ? 'red' : 'none',
        },
      }}
    >
      {isFollowing ? (hover ? 'Unfollow' : 'Following') : 'Follow'}
    </Button>
  )
}
