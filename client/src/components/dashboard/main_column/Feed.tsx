import { useEffect, useState } from 'react'
import { Tweet } from '@myTypes/tweet'
import { getFeedForUserRequest } from '@api/tweets'
import { useAuth } from '@hooks/useAuth'
import { Tweets } from '@components/tweets/Tweets'
import { Box, CircularProgress, Theme, Typography } from '@mui/material'

export const Feed: React.FC = () => {
  const { user, token } = useAuth()

  const [feed, setFeed] = useState<Tweet[]>([])
  const [loadingFeed, setLoadingFeed] = useState(true)

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        if (user) {
          const res = await getFeedForUserRequest(user.id, token)
          setFeed(res.data)
        }
      } catch (error) {
        console.log('Error fetching feed: ', error)
      } finally {
        setLoadingFeed(false)
      }
    }
    fetchFeed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loadingFeed ? (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  ) : feed.length > 0 ? (
    <>
      <Box
        sx={(theme: Theme) => ({
          height: '50px',
          borderBottom: `1px solid ${theme.myPalette.greyDivider}`,
        })}
      ></Box>
      <Tweets tweets={feed} loadingTweets={loadingFeed} />
    </>
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
        There are no publications yet. Follow some people to start seeing
        content.
      </Typography>
    </Box>
  )
}
