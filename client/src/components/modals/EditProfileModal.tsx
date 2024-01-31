import { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { User, UserUpdateDto } from '@myTypes/auth'
import { useAuth } from '@hooks/useAuth'
import { DateFields } from '@components/utils/DateFields'
import getModalStyle from '@utils/modalStyle'
import cameraIcon from '@assets/profile-camera.svg'

interface EditProfileModalProps {
  visible: boolean
  close: () => void
  user: User
  profilePic: string
  banner: string
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  close,
  user,
  profilePic,
  banner,
}) => {
  const theme = useTheme()
  const style = getModalStyle(theme, {
    height: 700,
    width: 600,
  })

  const [name, setName] = useState(user.fullname)
  const [bio, setBio] = useState(user.bio)
  const [day, setDay] = useState(new Date(user.dateOfBirth).getDate())
  const [month, setMonth] = useState(new Date(user.dateOfBirth).getMonth())
  const [year, setYear] = useState(new Date(user.dateOfBirth).getFullYear())

  const { updateUser } = useAuth()

  const handleEdit = () => {
    const userData: UserUpdateDto = {
      fullname: name,
      bio: bio,
      dateOfBirth: new Date(year, month, day),
    }

    updateUser(user.id, userData)
    close()
  }

  return (
    <Modal open={visible} onClose={close}>
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={close}
              style={{ float: 'left', color: 'white', marginRight: 20 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '1.3rem',
                whiteSpace: 'nowrap',
              }}
            >
              Edit profile
            </Typography>
          </Box>

          <Button
            onClick={handleEdit}
            variant="contained"
            sx={{ bgcolor: 'white', borderRadius: '50px' }}
          >
            Save
          </Button>
        </Box>

        <Box
          sx={{
            position: 'relative',
            height: 200,
            width: '100%',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <IconButton
              sx={{
                bgcolor: (theme: Theme) => theme.myPalette.greyShadow,
              }}
            >
              <img src={cameraIcon} height={25} width={25} />
            </IconButton>
            <IconButton
              sx={{
                bgcolor: (theme: Theme) => theme.myPalette.greyShadow,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Avatar
            src={profilePic}
            sx={{
              position: 'absolute',
              bottom: -70,
              left: '15%',
              transform: 'translateX(-50%)',
              width: 130,
              height: 130,
              border: '4px solid black',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -25,
              left: '15%',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
          >
            <IconButton
              sx={{
                bgcolor: (theme: Theme) => theme.myPalette.greyShadow,
              }}
            >
              <img src={cameraIcon} height={25} width={25} />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ marginTop: '15%', mx: 3 }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 4 }}
          />

          <TextField
            label="Bio"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <DateFields
            day={day}
            setDay={setDay}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />
        </Box>
      </Box>
    </Modal>
  )
}
