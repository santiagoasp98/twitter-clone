import { Box, CircularProgress, Typography } from '@mui/material'
import { TweetCard } from './TweetCard'
import { useTweets } from '../hooks/useTweets'
import { useAuth } from '../hooks/useAuth'

export const Tweets: React.FC = () => {
  const { user } = useAuth()
  const { tweets, fetchTweets, loadingTweets } = useTweets()

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
        (tweets.length > 0 ? (
          tweets.map((tweet) => (
            <TweetCard
              key={tweet._id}
              tweet={tweet}
              user={user}
              refetch={fetchTweets}
            />
          ))
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              m: 2,
            }}
          >
            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
              This account has no tweets
            </Typography>
          </Box>
        ))
      )}
    </>
  )
}
