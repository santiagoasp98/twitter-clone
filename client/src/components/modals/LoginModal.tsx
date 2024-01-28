import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Modal,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import googleLogo from '../../assets/google-logo.svg'
import { useEffect, useState } from 'react'
import { UserLoginDto } from '../../types/auth'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import getModalStyle from '../../utils/modalStyle'
import { AxiosError } from 'axios'

interface LoginModalProps {
  visible: boolean
  close: () => void
  openRegister: () => void
}

export const LoginModal: React.FC<LoginModalProps> = ({
  visible,
  close,
  openRegister,
}) => {
  const theme = useTheme()
  const style = getModalStyle(theme, {})

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { login, user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate(`/${user.username}`)
    }
  }, [user, navigate])

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let emailError = false
    let passwordError = false

    setEmailErrorMessage('')

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    if (!email.trim()) {
      emailError = true
      setEmailErrorMessage('Email is required')
    } else if (!emailRegex.test(email)) {
      emailError = true
      setEmailErrorMessage('Invalid email address')
    }

    if (!password.trim()) {
      passwordError = true
    }

    setEmailError(emailError)
    setPasswordError(passwordError)

    if (emailError || passwordError) {
      return
    }

    const userData: UserLoginDto = {
      email: email,
      password: password,
    }

    try {
      await login(userData)
      close()
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message)
      } else {
        setErrorMessage('An unknown error occurred :(')
      }
      setOpenErrorSnackbar(true)
    }
  }

  const handleOpenRegister = () => {
    close()
    openRegister()
  }

  return (
    <Modal open={visible} onClose={close}>
      <>
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenErrorSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setOpenErrorSnackbar(false)}
            severity="error"
            variant="filled"
          >
            {errorMessage}
          </Alert>
        </Snackbar>
        <Box sx={{ ...style, pb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              m: 1,
            }}
          >
            <IconButton
              onClick={close}
              style={{ float: 'right', color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
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
                sx={{
                  '&:hover': {
                    cursor: 'default',
                  },
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
                  onChange={(e) => {
                    setEmailError(false)
                    setEmailErrorMessage('')
                    setEmail(e.target.value)
                  }}
                  error={emailError}
                  helperText={emailErrorMessage}
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
                  onChange={(e) => {
                    setPasswordError(false)
                    setPassword(e.target.value)
                  }}
                  error={passwordError}
                  helperText={passwordError ? 'Password is required' : ''}
                />
                <Button
                  disabled={emailError || passwordError}
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
      </>
    </Modal>
  )
}
