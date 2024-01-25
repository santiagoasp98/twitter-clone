import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Box, CircularProgress } from '@mui/material'

interface PrivateRouteProps {
  children: ReactNode
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isLoggedIn, loading } = useAuth()

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/landing" replace />
  }

  return children
}
