import {
  Button,
  Divider,
  MenuList,
  Theme,
  Typography,
  styled,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { Route, Routes } from 'react-router-dom'
import { Profile } from '../components/Profile'
import { Messages } from '../components/Messages'
import { Explore } from '../components/Explore'
import { Feed } from '../components/Feed'
import { Item } from '../components/MenuItem'

import TwitterLogo from '../assets/twitter-logo.svg'
import MenuHome from '../assets/menu-home.svg'
import MenuExplore from '../assets/menu-explore.svg'
import MenuNotifications from '../assets/menu-notifications.svg'
import MenuMessages from '../assets/menu-messages.svg'
import MenuLists from '../assets/menu-lists.svg'
import MenuSaved from '../assets/menu-saved.svg'
import MenuProfile from '../assets/menu-profile.svg'
import MenuOptions from '../assets/menu-options.svg'
import { useAuth } from '../hooks/useAuth'
import { SearchBox } from '../components/SearchBox'
import { SuggestUsers } from '../components/SuggestUsers'
import { Trends } from '../components/Trends'
import { useState } from 'react'
import { NewTweetModal } from '../components/modals/NewTweetModal'

const StyledGrid = styled(Grid)(() => ({
  height: '100vh',
  overflow: 'hidden',
}))

const StyledColumn = styled(Grid)(() => ({
  position: 'sticky',
  top: 0,
  padding: 0,
  height: '100%',
  overflow: 'hidden',
}))

const ScrollableColumn = styled(Grid)({
  flex: 1,
  overflow: 'auto',
})

export const Dashboard: React.FC = () => {
  const { user } = useAuth()

  const [visibleNewTweet, setVisibleNewTweet] = useState(false)

  return (
    <>
      <StyledGrid container spacing={0} sx={{ flexWrap: 'nowrap' }}>
        {/* Columna Izquierda */}
        <StyledColumn item xs={3}>
          {/* Menu */}
          <Grid
            container
            spacing={0}
            sx={{ flexWrap: 'nowrap' }}
            style={{ height: '100vh' }}
          >
            <Grid item xs={4}></Grid>
            <Grid item xs={8}>
              <MenuList>
                <Item item="" icon={TwitterLogo} height={35} width={35} />
                <Item item="Home" icon={MenuHome} param="/home" />
                <Item item="Explore" icon={MenuExplore} param="/explore" />
                <Item item="Notifications" icon={MenuNotifications} />
                <Item item="Messages" icon={MenuMessages} param="/messages" />
                <Item item="Lists" icon={MenuLists} />
                <Item
                  item="Bookmarks"
                  icon={MenuSaved}
                  height={30}
                  width={30}
                />
                <Item
                  item="Profile"
                  icon={MenuProfile}
                  param={`/${user?.username}`}
                  height={20}
                  width={20}
                />
                <Item item="More" icon={MenuOptions} />
              </MenuList>
              <Button
                onClick={() => setVisibleNewTweet(true)}
                variant="contained"
                style={{ width: '100%', height: 50, borderRadius: 50 }}
                sx={{ textTransform: 'none' }}
              >
                <Typography sx={{ fontWeight: 'bold' }}>Tweet</Typography>
              </Button>
            </Grid>
          </Grid>
        </StyledColumn>

        {/* ******************* */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            borderColor: (theme: Theme) => theme.myPalette.greyDivider,
            marginLeft: 3,
          }}
        />
        {/* ******************* */}

        {/* Columna Central (Scrolleable) */}
        <ScrollableColumn item xs={5}>
          {/* Main */}
          <Routes>
            <Route path="/:username" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/home" element={<Feed />} />
          </Routes>
        </ScrollableColumn>

        {/* ******************* */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            borderColor: (theme: Theme) => theme.myPalette.greyDivider,
            marginRight: 3,
          }}
        />
        {/* ******************* */}

        {/* Columna Derecha */}
        <StyledColumn item xs={4}>
          {/* Trends */}
          <Grid container spacing={0} sx={{ flexWrap: 'nowrap' }}>
            <Grid item xs={8}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <SearchBox />
                </Grid>
                <Grid item>
                  <SuggestUsers />
                </Grid>
                <Grid item style={{ height: '100vh' }} overflow="auto">
                  <Trends />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </StyledColumn>
      </StyledGrid>
      <NewTweetModal
        visible={visibleNewTweet}
        close={() => setVisibleNewTweet(false)}
      />
    </>
  )
}
