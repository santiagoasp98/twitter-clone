import { useEffect, useState } from 'react'
import { Box, Theme, Typography } from '@mui/material'
import { User } from '@myTypes/auth'
import { useAuth } from '@hooks/useAuth'
import { UserCard } from '@components/dashboard/right_column/UserCard'

export const SuggestUsers: React.FC = () => {
  const { user } = useAuth()

  const [users, setUsers] = useState<User[]>([])

  const { getUsers } = useAuth()

  useEffect(() => {
    const fetchUsers = async () => {
      if (user) {
        const users = await getUsers(user.id)
        setUsers(users)
      }
    }
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      sx={{
        borderRadius: '20px',
        width: '100%',
        height: 'auto',
        overflow: 'auto',
        backgroundColor: (theme: Theme) => theme.myPalette.greyBackground,
        paddingTop: 2,
        paddingBottom: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 2, mb: 2 }}>
        You might like
      </Typography>
      {users
        .filter((suggUser) => suggUser.id !== user?.id)
        .map((suggUser) => (
          <UserCard key={suggUser.id} user={suggUser} />
        ))}
    </Box>
  )
}
