import {
  Box,
  Modal,
  Theme,
  IconButton,
  Avatar,
  TextField,
  Divider,
  Button,
  Typography,
  useTheme,
  Alert,
  Snackbar,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import profilePic from '../../assets/profile-picture.jpeg'
import newTweetImage from '../../assets/new-tweet-image.svg'
import newTweetGif from '../../assets/new-tweet-gif.svg'
import newTweetPoll from '../../assets/new-tweet-poll.svg'
import newTweetEmoji from '../../assets/new-tweet-emoji.svg'
import newTweetSchedule from '../../assets/new-tweet-schedule.svg'
import newTweetLocation from '../../assets/new-tweet-location.svg'
import newTweetWorld from '../../assets/new-tweet-world.svg'
import { useState } from 'react'
import getModalStyle from '../../utils/modalStyle'
import { createTweetRequest } from '../../api/tweets'
import { CreateTweet } from '../../types/tweet'
import { useAuth } from '../../hooks/useAuth'
import { AxiosError } from 'axios'
import { useTweets } from '../../hooks/useTweets'

interface NewTweetModalProps {
  author: string
  visible: boolean
  close: () => void
}

const iconSize = 19
const charsLimit = 280

export const NewTweetModal: React.FC<NewTweetModalProps> = ({
  author,
  visible,
  close,
}) => {
  const { token } = useAuth()
  const { fetchTweets } = useTweets()

  const [tweetContent, setTweetContent] = useState('')

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const theme = useTheme()
  const style = getModalStyle(theme, {
    width: 600,
    top: '20%',
    left: '50%',
    p: 1,
  })

  const handleNewTweet = async () => {
    const tweetData: CreateTweet = {
      content: tweetContent,
      author,
    }
    try {
      await createTweetRequest(tweetData, token)
      await fetchTweets()
      close()
      setTweetContent('')
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message)
      } else {
        setErrorMessage('An unknown error occurred :( Try again later')
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
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              mb: 1,
            }}
          >
            <IconButton
              onClick={close}
              style={{ float: 'left', color: 'white' }}
            >
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
                inputProps={{ maxLength: charsLimit, spellCheck: 'false' }}
                value={tweetContent}
                onChange={(e) => setTweetContent(e.target.value)}
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              m: 1,
            }}
          >
            <img src={newTweetWorld} width={iconSize} height={iconSize} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 'bold', color: '#90caf9', ml: 1 }}
            >
              Everyone can reply
            </Typography>
          </Box>
          <Divider
            sx={{
              bgcolor: (theme: Theme) => theme.myPalette.greyDivider,
              my: 1,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                m: 1,
                '& > *': {
                  marginRight: '1em',
                },
              }}
            >
              <img src={newTweetImage} width={iconSize} height={iconSize} />
              <img src={newTweetGif} width={iconSize} height={iconSize} />
              <img src={newTweetPoll} width={iconSize} height={iconSize} />
              <img src={newTweetEmoji} width={iconSize} height={iconSize} />
              <img src={newTweetSchedule} width={iconSize} height={iconSize} />
              <img src={newTweetLocation} width={iconSize} height={iconSize} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{ padding: '0 1em', color: '#90caf9' }}
              >{`${tweetContent.length}/${charsLimit}`}</Box>
              <Button
                onClick={handleNewTweet}
                variant="contained"
                sx={{ borderRadius: '50px' }}
                disabled={!tweetContent.trim()}
              >
                Tweet
              </Button>
            </Box>
          </Box>
        </Box>
      </>
    </Modal>
  )
}
