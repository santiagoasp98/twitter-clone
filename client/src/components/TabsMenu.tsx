import { Box, Tab, Tabs, Theme } from '@mui/material'
import { useState } from 'react'
import { Tweets } from './Tweets'

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

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={tabStyle} label="Posts" {...a11yProps(0)} />
          <Tab sx={tabStyle} label="Replies" {...a11yProps(1)} />
          <Tab sx={tabStyle} label="Highlights" {...a11yProps(2)} />
          <Tab sx={tabStyle} label="Media" {...a11yProps(3)} />
          <Tab sx={tabStyle} label="Likes" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Tweets />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Replies :p
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Highlights :p
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Media :p
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Likes
      </CustomTabPanel>
    </>
  )
}
