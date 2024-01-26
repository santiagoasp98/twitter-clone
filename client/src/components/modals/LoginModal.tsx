import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Modal,
  TextField,
  Theme,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import googleLogo from '../../assets/google-logo.svg'
import { useEffect, useState } from 'react'
import { UserLoginDto } from '../../types/auth'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

interface LoginModalProps {
  visible: boolean
  close: () => void
  openRegister: () => void
}

const style = (theme: Theme) => ({
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#000',
  boxShadow: 24,
  borderRadius: 5,
  border: `1px solid ${theme.myPalette.greyDivider}`,
  p: 4,
})

export const LoginModal: React.FC<LoginModalProps> = ({
  visible,
  close,
  openRegister,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate(`/${user.username}`)
    }
  }, [user, navigate])

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const userData: UserLoginDto = {
      email: email,
      password: password,
    }

    try {
      await login(userData)
      close()
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenRegister = () => {
    close()
    openRegister()
  }

  return (
    <Modal open={visible} onClose={close}>
      <Box sx={style}>
        <IconButton onClick={close} style={{ float: 'right', color: 'white' }}>
          <CloseIcon />
        </IconButton>
        <Container
          style={{
            width: 400,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Container>
            <Typography
              variant="h4"
              style={{ fontWeight: 'bold', marginBottom: 30 }}
            >
              Sign in to Twitter
            </Typography>

            <Button
              variant="contained"
              style={{
                width: '100%',
                borderRadius: 50,
                backgroundColor: 'white',
                color: 'black',
              }}
            >
              <Avatar
                src={googleLogo}
                alt="Google"
                sx={{ width: 20, height: 20 }}
                style={{ marginRight: 10 }}
              />
              Sign up with Google
            </Button>

            <Box display="flex" alignItems="center" my={4}>
              <Box flexGrow={1} bgcolor="#fff" height="1px" />
              <Box mx={2}>
                <Typography>OR</Typography>
              </Box>
              <Box flexGrow={1} bgcolor="#fff" height="1px" />
            </Box>

            <form onSubmit={handleLogin} noValidate autoComplete="off">
              <TextField
                required
                label="Email"
                type="email"
                variant="outlined"
                style={{ width: '100%', marginBottom: '20px' }}
                sx={{
                  '& label': { color: 'grey' },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                label="Password"
                type="password"
                variant="outlined"
                style={{ width: '100%', marginBottom: '20px' }}
                sx={{
                  '& label': { color: 'grey' },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                style={{ width: '100%', borderRadius: 50 }}
              >
                Sign In
              </Button>
            </form>
          </Container>

          <Container>
            <Typography sx={{ mt: 4 }}>
              Don't you have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={handleOpenRegister}
              >
                Sign Up
              </Link>
            </Typography>
          </Container>
        </Container>
      </Box>
    </Modal>
  )
}
