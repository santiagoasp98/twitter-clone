import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { CreateUserDto } from '../../types/auth'
import { useNavigate } from 'react-router-dom'
import { DateFields } from '../utils/DateFields'
import getModalStyle from '../../utils/modalStyle'
import { AxiosError } from 'axios'

interface RegisterModalProps {
  visible: boolean
  close: () => void
}

// const style = (theme: Theme) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between',
//   position: 'absolute' as const,
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 500,
//   bgcolor: '#000',
//   border: `1px solid ${theme.myPalette.greyDivider}`,
//   boxShadow: 24,
//   borderRadius: 5,
//   p: 4,
// })

export const RegisterModal: React.FC<RegisterModalProps> = ({
  visible,
  close,
}) => {
  const theme = useTheme()
  const style = getModalStyle(theme, {})

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [month, setMonth] = useState(0)
  const [day, setDay] = useState(1)
  const [year, setYear] = useState(new Date().getFullYear())

  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { register } = useAuth()

  const navigate = useNavigate()

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let usernameError = false
    let emailError = false
    let nameError = false
    let passwordError = false

    setEmailErrorMessage('')

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    if (!username.trim()) {
      usernameError = true
    }

    if (!email.trim()) {
      emailError = true
      setEmailErrorMessage('Email is required')
    } else if (!emailRegex.test(email)) {
      emailError = true
      setEmailErrorMessage('Invalid email address')
    }

    if (!name.trim()) {
      nameError = true
    }

    if (!password.trim()) {
      passwordError = true
    }

    setUsernameError(usernameError)
    setEmailError(emailError)
    setNameError(nameError)
    setPasswordError(passwordError)

    if (usernameError || emailError || nameError || passwordError) {
      return
    }
    const user: CreateUserDto = {
      username: username,
      email: email,
      fullname: name,
      dateOfBirth: new Date(year, month, day),
      password: password,
    }

    try {
      await register(user)
      close()
      navigate(`/${username}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message)
      } else {
        setErrorMessage('An unknown error occurred :(')
      }
      setOpenErrorSnackbar(true)
    }
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
          <Container>
            <Typography
              variant="h4"
              style={{ fontWeight: 'bold', marginBottom: 30 }}
            >
              Create your account
            </Typography>
            <form
              id="register-form"
              onSubmit={handleRegister}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                label="Username"
                variant="outlined"
                style={{ width: '100%', marginBottom: '20px' }}
                sx={{
                  '& label': { color: 'grey' },
                }}
                value={username}
                onChange={(e) => {
                  setUsernameError(false)
                  setUsername(e.target.value)
                }}
                error={usernameError}
                helperText={usernameError ? 'Username is required' : ''}
              />
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
                label="Name"
                variant="outlined"
                style={{ width: '100%', marginBottom: '20px' }}
                sx={{
                  '& label': { color: 'grey' },
                  ':hover': { borderColor: 'blue' },
                }}
                value={name}
                onChange={(e) => {
                  setNameError(false)
                  setName(e.target.value)
                }}
                error={nameError}
                helperText={nameError ? 'Name is required' : ''}
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

              <DateFields
                day={day}
                setDay={setDay}
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
              />
            </form>
          </Container>

          <Container sx={{ marginTop: 5, width: '100%' }}>
            <Button
              type="submit"
              variant="contained"
              style={{ width: '100%', borderRadius: 50 }}
              form="register-form"
            >
              Sign Up
            </Button>
          </Container>
        </Box>
      </>
    </Modal>
  )
}
