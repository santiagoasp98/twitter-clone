import { Box, CircularProgress, Typography } from '@mui/material'
import { TweetCard } from './TweetCard'
import { useTweets } from '../hooks/useTweets'

export const Tweets: React.FC = () => {
  const { tweets, tweetsOwner, fetchTweets, loadingTweets } = useTweets()

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
        tweetsOwner &&
        (tweets.length > 0 ? (
          tweets.map((tweet) => (
            <TweetCard
              key={tweet._id}
              tweet={tweet}
              user={tweetsOwner}
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
