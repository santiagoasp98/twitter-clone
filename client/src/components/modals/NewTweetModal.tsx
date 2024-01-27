import {
  Box,
  Modal,
  Theme,
  IconButton,
  Avatar,
  TextField,
  Divider,
  Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import profilePic from '../../assets/profile-picture.jpeg'

interface NewTweetModalProps {
  visible: boolean
  close: () => void
}

const style = (theme: Theme) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute' as const,
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 'auto',
  bgcolor: '#000',
  boxShadow: 24,
  borderRadius: 5,
  border: `1px solid ${theme.myPalette.greyDivider}`,
  p: 1,
})

export const NewTweetModal: React.FC<NewTweetModalProps> = ({
  visible,
  close,
}) => {
  return (
    <Modal open={visible} onClose={close}>
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <IconButton onClick={close} style={{ float: 'left', color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ alignItems: 'flex-start', m: 1 }}>
            <Avatar src={profilePic} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              placeholder="What is happening?"
              rows={3}
              sx={{
                '& .MuiOutlinedInput-input': {
                  fontSize: '1.2em',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
              }}
            />
          </Box>
        </Box>
        <Divider
          sx={{ bgcolor: (theme: Theme) => theme.myPalette.greyDivider, my: 1 }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Box></Box>
          <Button variant="contained" sx={{ borderRadius: '50px' }}>
            Tweet
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
