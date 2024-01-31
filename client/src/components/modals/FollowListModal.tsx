import { useEffect, useState } from 'react'
import { Box, IconButton, Modal, Typography, useTheme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import getModalStyle from '@utils/modalStyle'
import { UserFollow } from '@myTypes/follower'
import { getFollowersRequest, getFollowingRequest } from '@api/followers'
import { useAuth } from '@hooks/useAuth'
import { UserCard } from '@components/dashboard/right_column/UserCard'

interface FollowListModalProps {
  visible: boolean
  type: string
  close: () => void
  userId: string
}

export const FollowListModal: React.FC<FollowListModalProps> = ({
  visible,
  type,
  close,
  userId,
}) => {
  const theme = useTheme()
  const { token } = useAuth()

  const style = getModalStyle(theme, {})

  const [usersList, setUsersList] = useState<UserFollow[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      let response
      try {
        if (type === 'Followers') {
          response = await getFollowersRequest(userId, token)
          setUsersList(response.data)
        } else if (type === 'Following') {
          response = await getFollowingRequest(userId, token)
          setUsersList(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  return (
    <Modal open={visible} onClose={close}>
      <Box sx={{ ...style, pb: 2, overflow: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            m: 1,
            height: 40,
          }}
        >
          <Typography
            variant="h5"
            style={{ fontWeight: 'bold', marginBottom: 30 }}
            sx={{ m: 1 }}
          >
            {type}
          </Typography>
          <IconButton onClick={close} sx={{ height: 'auto' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {usersList.length > 0 ? (
          usersList.map((user) => (
            <UserCard key={user._id} user={user} withBio={true} close={close} />
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              m: 2,
            }}
          >
            {type === 'Followers' ? (
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                There are no followers.
              </Typography>
            ) : (
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                There are no following users.
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  )
}
