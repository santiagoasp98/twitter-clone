import { Box, Theme, Typography } from '@mui/material'

interface Trend {
  title: string
  category: string // like sport, music, movies, etc
  cant_tweets: string // like 16.3K tweets, 3099 tweets, etc
}

const trends_examples: Trend[] = [
  {
    title: 'Real Madrid',
    category: 'Sports',
    cant_tweets: '16.3K tweets',
  },
  {
    title: 'Cristiano Ronaldo',
    category: 'Sports',
    cant_tweets: '3099 tweets',
  },
  {
    title: 'EEUU',
    category: 'Politics',
    cant_tweets: '301K tweets',
  },
  {
    title: 'Freddy Mercury',
    category: 'Music',
    cant_tweets: '12.3K tweets',
  },
  {
    title: 'Lionel Messi',
    category: 'Sports',
    cant_tweets: '12.3K tweets',
  },
  {
    title: 'RIP',
    category: 'Entertainment',
    cant_tweets: '1801 tweets',
  },
  {
    title: 'Twitch',
    category: 'Technology',
    cant_tweets: '233K tweets',
  },
  {
    title: 'Santiago',
    category: 'Programming',
    cant_tweets: '1000 tweets',
  },
]

export const Trends: React.FC = () => {
  return (
    <Box
      sx={{
        borderRadius: '20px',
        width: '100%',
        height: '49vh',
        overflow: 'auto',
        backgroundColor: (theme: Theme) => theme.myPalette.greyBackground,
        paddingTop: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 2, mb: 2 }}>
        Trends for you
      </Typography>
      {trends_examples.map((trend, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'auto',
            height: '80px',
            '&:hover': {
              cursor: 'pointer',
              bgcolor: (theme: Theme) => theme.myPalette.darkGreyShadow,
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mx: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.8rem',
                color: (theme: Theme) => theme.myPalette.greyFont,
              }}
            >
              {trend.category}
            </Typography>
            <Typography variant="body1">{trend.title}</Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.8rem',
                color: (theme: Theme) => theme.myPalette.greyFont,
              }}
            >
              {trend.cant_tweets}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
