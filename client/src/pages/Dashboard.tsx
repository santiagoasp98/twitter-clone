import { useState } from 'react'
import {
  Button,
  Divider,
  Icon,
  MenuList,
  Theme,
  Typography,
  styled,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { Route, Routes } from 'react-router-dom'

import { Profile } from '@components/dashboard/main_column/Profile'
import { Feed } from '@components/dashboard/main_column/Feed'
import { Item } from '@components/dashboard/left_column/MenuItem'
import { SearchBox } from '@components/dashboard/right_column/SearchBox'
import { SuggestUsers } from '@components/dashboard/right_column/SuggestUsers'
import { Trends } from '@components/dashboard/right_column/Trends'
import { NewTweetModal } from '@components/modals/NewTweetModal'

import { TweetsProvider } from '@context/TweetsContext'
import { useAuth } from '@hooks/useAuth'

import TwitterLogo from '@assets/twitter-logo.svg'
import MenuHome from '@assets/menu-home.svg'
import MenuExplore from '@assets/menu-explore.svg'
import MenuNotifications from '@assets/menu-notifications.svg'
import MenuMessages from '@assets/menu-messages.svg'
import MenuLists from '@assets/menu-lists.svg'
import MenuSaved from '@assets/menu-saved.svg'
import MenuProfile from '@assets/menu-profile.svg'
import MenuOptions from '@assets/menu-options.svg'

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
              <Icon
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'visible',
                  mt: 1,
                  ml: '8px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  ':hover': {
                    backgroundColor: (theme: Theme) =>
                      theme.myPalette.greyShadow,
                  },
                }}
              >
                <img src={TwitterLogo} height={45} width={45} />
              </Icon>
              <MenuList sx={{ pt: 0 }}>
                <Item
                  item="Home"
                  icon={MenuHome}
                  param={`/${user?.username}/home`}
                />
                <Item
                  item="Explore"
                  icon={MenuExplore}
                  height={22}
                  width={22}
                />
                <Item
                  item="Notifications"
                  icon={MenuNotifications}
                  height={30}
                  width={30}
                />
                <Item item="Messages" icon={MenuMessages} />
                <Item item="Lists" icon={MenuLists} />
                <Item
                  item="Bookmarks"
                  icon={MenuSaved}
                  height={25}
                  width={25}
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
        <ScrollableColumn
          item
          xs={5}
          sx={{
            height: '100vh',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {/* Main */}
          <Routes>
            <Route
              path="/:username"
              element={
                <TweetsProvider>
                  <Profile />
                  {user && (
                    <NewTweetModal
                      author={user.id}
                      visible={visibleNewTweet}
                      close={() => setVisibleNewTweet(false)}
                    />
                  )}
                </TweetsProvider>
              }
            />
            <Route
              path="/:username/home"
              element={
                <TweetsProvider>
                  <Feed />
                </TweetsProvider>
              }
            />
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
          <Grid
            container
            spacing={0}
            sx={{ flexWrap: 'nowrap' }}
            overflow="auto"
          >
            <Grid
              item
              xs={8}
              sx={{
                height: '100vh',
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <SearchBox />
                </Grid>
                <Grid item>
                  <SuggestUsers />
                </Grid>
                <Grid item>
                  <Trends />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </StyledColumn>
      </StyledGrid>
    </>
  )
}
