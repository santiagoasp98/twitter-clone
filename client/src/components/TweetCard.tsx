import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Theme,
  Typography,
} from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { Tweet, UpdateTweet } from '../types/tweet'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { User } from '../types/auth'

import profilePic from '../assets/profile-picture.jpeg'
import tweetComment from '../assets/tweet-comment.svg'
import tweetRetweet from '../assets/tweet-retweet.svg'
import tweetLike from '../assets/tweet-like.svg'
import tweetStats from '../assets/tweet-stats.svg'

import moment from 'moment'
import { useEffect, useState } from 'react'
import { deleteTweetRequest, updateTweetRequest } from '../api/tweets'
import { useAuth } from '../hooks/useAuth'

interface TweetCardProps {
  tweet: Tweet
  user: User
  refetch: () => Promise<void>
}

const iconSize = 18
// const randomViews = Math.floor(Math.random() * 500) + 1

export const TweetCard: React.FC<TweetCardProps> = ({
  tweet,
  user,
  refetch,
}) => {
  const { token } = useAuth()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [editingTweet, setEditingTweet] = useState(false)
  const [newTweetContent, setNewTweetContent] = useState(tweet.content)

  const [randomViews, setRandomViews] = useState(
    Math.floor(Math.random() * 500) + 1,
  ) // :p
  useEffect(() => {
    setRandomViews(Math.floor(Math.random() * 500) + 1)
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEditTweet = async () => {
    const tweetData: UpdateTweet = {
      content: newTweetContent,
    }
    try {
      await updateTweetRequest(tweet._id, tweetData, token)
      setEditingTweet(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteTweet = async () => {
    try {
      await deleteTweetRequest(tweet._id, token)
      setAnchorEl(null)
      await refetch()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box
      sx={(theme: Theme) => ({
        display: 'flex',
        flexDirection: 'row',
        borderBottom: `1px solid ${theme.myPalette.greyDivider}`,
        p: 1,
      })}
    >
      {/* avatar */}
      <Box sx={{ alignItems: 'flex-start', m: 1 }}>
        <Avatar src={profilePic} />
      </Box>
      {/* main */}
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* name, username, date and options */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
              {user.fullname}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: (theme: Theme) => theme.myPalette.greyFont,
                ml: 1,
              }}
            >
              @{user.username}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: (theme: Theme) => theme.myPalette.greyFont,
                ml: 1,
              }}
            >
              • {moment(tweet.tweetedAt).format('MMM D')}
            </Typography>
          </Box>
          {/* options */}
          <IconButton onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ borderRadius: '50px' }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null)
                setEditingTweet(true)
              }}
            >
              <EditIcon />{' '}
              <Typography variant="body1" sx={{ ml: 1 }}>
                Edit tweet
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleDeleteTweet} sx={{ color: 'red' }}>
              <DeleteIcon />{' '}
              <Typography variant="body1" sx={{ ml: 1 }}>
                Delete tweet
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
        {/* content or editing */}
        {editingTweet ? (
          <TextField
            multiline
            variant="standard"
            value={newTweetContent}
            onChange={(e) => setNewTweetContent(e.target.value)}
          />
        ) : (
          <Box>{newTweetContent}</Box>
        )}
        {/* buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            mt: 1,
          }}
        >
          {editingTweet ? (
            <>
              <Box></Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Button
                  onClick={() => {
                    setNewTweetContent(tweet.content)
                    setEditingTweet(false)
                  }}
                  variant="outlined"
                  sx={{ borderRadius: '50px' }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEditTweet}
                  variant="contained"
                  sx={{ borderRadius: '50px', ml: 1 }}
                >
                  Save
                </Button>
              </Box>
            </>
          ) : (
            <>
              <img src={tweetComment} width={iconSize} height={iconSize} />
              <img src={tweetRetweet} width={iconSize} height={iconSize} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <img
                  src={tweetLike}
                  width={iconSize}
                  height={iconSize}
                  style={{ marginRight: 5, cursor: 'pointer' }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: (theme: Theme) => theme.myPalette.greyFont }}
                >
                  {tweet.likesCount > 0 && tweet.likesCount}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <img
                  src={tweetStats}
                  width={iconSize}
                  height={iconSize}
                  style={{ marginRight: 5 }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: (theme: Theme) => theme.myPalette.greyFont }}
                >
                  {randomViews}K
                </Typography>
              </Box>
              <Box></Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}
