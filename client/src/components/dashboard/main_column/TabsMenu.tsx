import { useState } from 'react'
import { Box, Tab, Tabs, Theme, Typography } from '@mui/material'
import { Tweets } from '@components/tweets/Tweets'
import { useTweets } from '@hooks/useTweets'

interface TabsMenuProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabsMenuProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ mb: 1 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const tabStyle = {
  '&:hover': { backgroundColor: (theme: Theme) => theme.myPalette.greyShadow },
  transition: 'background-color 0.3s ease',
}

export const TabsMenu: React.FC = () => {
  const [value, setValue] = useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const { tweets, loadingTweets } = useTweets()

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={tabStyle} label="Tweets" {...a11yProps(0)} />
          <Tab sx={tabStyle} label="Replies" {...a11yProps(1)} disabled />
          <Tab sx={tabStyle} label="Highlights" {...a11yProps(2)} disabled />
          <Tab sx={tabStyle} label="Media" {...a11yProps(3)} disabled />
          <Tab sx={tabStyle} label="Likes" {...a11yProps(4)} disabled />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {tweets.length > 0 ? (
          <Tweets tweets={tweets} loadingTweets={loadingTweets} />
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
              This account has no tweets.
            </Typography>
          </Box>
        )}
      </CustomTabPanel>
    </>
  )
}
