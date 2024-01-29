import { useCallback, useEffect, useState } from 'react'
import { Tweet } from '../types/tweet'
import { Box, CircularProgress } from '@mui/material'
import { getTweetsByUsernameRequest } from '../api/tweets'
import { User } from '../types/auth'
import { TweetCard } from './TweetCard'
import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const Tweets: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loadingTweets, setLoadingTweets] = useState(true)

  const { getUserByUsername } = useAuth()
  const { username } = useParams()

  const fetchUser = useCallback(async () => {
    if (username) {
      try {
        const user = await getUserByUsername(username)
        setUser(user)
      } catch (err) {
        console.log('Error getting the user: ', err)
      }
    }
  }, [username, getUserByUsername])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const fetchTweets = async () => {
    try {
      if (user) {
        const res = await getTweetsByUsernameRequest(user.username)
        setTweets(res.data)
        setLoadingTweets(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLoadingTweets(true)
    fetchTweets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      {loadingTweets ? (
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        user &&
        tweets.map((tweet) => (
          <TweetCard
            key={tweet._id}
            tweet={tweet}
            user={user}
            refetch={fetchTweets}
          />
        ))
      )}
    </>
  )
}
