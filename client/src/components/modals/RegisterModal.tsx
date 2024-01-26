import {
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  TextField,
  Theme,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { CreateUserDto } from '../../types/auth'
import { useNavigate } from 'react-router-dom'
import { DateFields } from '../utils/DateFields'

interface RegisterModalProps {
  visible: boolean
  close: () => void
}

const style = (theme: Theme) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#000',
  border: `1px solid ${theme.myPalette.greyDivider}`,
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
})

export const RegisterModal: React.FC<RegisterModalProps> = ({
  visible,
  close,
}) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [month, setMonth] = useState(0)
  const [day, setDay] = useState(1)
  const [year, setYear] = useState(new Date().getFullYear())

  const { register } = useAuth()

  const navigate = useNavigate()

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const user: CreateUserDto = {
      username: username,
      email: email,
      fullname: name,
      dateOfBirth: new Date(year, month, day),
      password: password,
    }

    try {
      register(user)
      close()
      navigate(`/${username}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal open={visible} onClose={close}>
      <Box sx={style}>
        <Container>
          <IconButton
            onClick={close}
            style={{ float: 'right', color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
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
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setName(e.target.value)}
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
    </Modal>
  )
}
