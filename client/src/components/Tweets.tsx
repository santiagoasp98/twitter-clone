import { Box, CircularProgress } from '@mui/material'
import { TweetCard } from './TweetCard'
import { Tweet } from '../types/tweet'

interface TweetsProps {
  tweets: Tweet[]
  loadingTweets: boolean
}
export const Tweets: React.FC<TweetsProps> = ({ tweets, loadingTweets }) => {
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
        tweets.map((tweet) => <TweetCard key={tweet._id} tweet={tweet} />)
      )}
    </>
  )
}
