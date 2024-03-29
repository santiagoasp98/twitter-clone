import { useCallback, useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Icon,
  Link,
  Theme,
  Typography,
} from '@mui/material'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { TabsMenu } from '@components/dashboard/main_column/TabsMenu'
import { EditProfileModal } from '@components/modals/EditProfileModal'
import { FollowerButton } from '@components/utils/FollowerButton'

import profilePicture from '@assets/profile-picture.jpeg'
import profileBanner from '@assets/profile-banner.jpeg'
import balloon from '@assets/profile-balloon.svg'
import calendar from '@assets/profile-calendar.svg'
import logoutIcon from '@assets/logout.svg'
import { User } from '@myTypes/auth'
import { FollowListModal } from '@components/modals/FollowListModal'

export const Profile: React.FC = () => {
  const { user: userLoggedIn, getUserByUsername, logout } = useAuth()

  const { username } = useParams()

  const [user, setUser] = useState<User | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [visibleEditProfile, setVisibleEditProfile] = useState(false)

  const [openFollowList, setOpenFollowList] = useState(false)
  const [followType, setFollowType] = useState('')

  const fetchUser = useCallback(async () => {
    if (username) {
      setLoadingProfile(true)
      try {
        const user = await getUserByUsername(username)
        setUser(user)
      } catch (err) {
        console.log('Error getting the user: ', err)
      } finally {
        setLoadingProfile(false)
      }
    }
  }, [username, getUserByUsername])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <>
      {loadingProfile ? (
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
      ) : (
        <Box
          sx={{
            height: 'auto',
            width: '100%',
            marginBottom: 2,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: 200,
              width: '100%',
              backgroundImage: `url(${profileBanner})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Avatar
              src={profilePicture}
              sx={{
                position: 'absolute',
                bottom: -70,
                left: '15%',
                transform: 'translateX(-50%)',
                width: 140,
                height: 140,
                border: '4px solid black',
              }}
            />
            {user?.id === userLoggedIn?.id ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() => setVisibleEditProfile(true)}
                  sx={{
                    color: 'white',
                    position: 'absolute',
                    bottom: -45,
                    left: '70%',
                    borderColor: 'white',
                    borderRadius: '20px',
                    '&:hover': {
                      bgcolor: (theme: Theme) => theme.myPalette.greyShadow,
                      borderColor: 'white',
                    },
                  }}
                >
                  Edit profile
                </Button>
                <Icon
                  onClick={logout}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    position: 'absolute',
                    bottom: -45,
                    left: '92%',
                    borderColor: 'white',
                    overflow: 'visible',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    ':hover': {
                      backgroundColor: (theme: Theme) =>
                        theme.myPalette.greyShadow,
                    },
                  }}
                >
                  <img src={logoutIcon} height={25} width={25} />
                </Icon>
              </>
            ) : (
              user && <FollowerButton user={user} userLoggedIn={userLoggedIn} />
            )}
          </Box>

          <Box
            sx={{
              marginLeft: '2%',
              marginRight: '2%',
              marginTop: '15%',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {user?.fullname}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              sx={{
                color: (theme: Theme) => theme.myPalette.greyFont,
                fontSize: '1em',
              }}
            >
              @{user?.username}
            </Typography>

            <Typography gutterBottom>{user?.bio}</Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                color: (theme: Theme) => theme.myPalette.greyFont,
              }}
            >
              <Icon
                sx={{
                  display: 'flex',
                  mr: 0.2,
                  overflow: 'visible',
                  alignItems: 'center',
                }}
              >
                <img src={balloon} height={20} width={20} />
              </Icon>
              Born {moment(user?.dateOfBirth).format('MMMM D, yyyy')}
              <Icon
                sx={{
                  display: 'flex',
                  ml: 2,
                  mr: 0.2,
                  overflow: 'visible',
                  alignItems: 'center',
                }}
              >
                <img src={calendar} height={20} width={20} />
              </Icon>
              Joined {moment(user?.joinedAt).format('MMMM, yyyy')}
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 1,
              }}
            >
              <Link
                onClick={() => {
                  setFollowType('Following')
                  setOpenFollowList(true)
                }}
                underline="none"
                sx={{
                  display: 'flex',
                  color: 'inherit',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                <Typography sx={{ color: 'white', mr: 0.3 }}>
                  {user?.followingCount}
                </Typography>
                <Typography
                  sx={{ color: (theme: Theme) => theme.myPalette.greyFont }}
                >
                  Following
                </Typography>
              </Link>

              <Link
                onClick={() => {
                  setFollowType('Followers')
                  setOpenFollowList(true)
                }}
                underline="none"
                sx={{
                  display: 'flex',
                  color: 'inherit',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                <Typography sx={{ color: 'white', ml: 2, mr: 0.3 }}>
                  {user?.followersCount}
                </Typography>
                <Typography
                  sx={{ color: (theme: Theme) => theme.myPalette.greyFont }}
                >
                  Followers
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      )}
      {visibleEditProfile && user && (
        <EditProfileModal
          visible={visibleEditProfile}
          close={() => setVisibleEditProfile(false)}
          user={user}
          profilePic={profilePicture}
          banner={profileBanner}
        />
      )}
      {openFollowList && user && (
        <FollowListModal
          visible={openFollowList}
          type={followType}
          close={() => setOpenFollowList(false)}
          userId={user.id}
        />
      )}
      <TabsMenu />
    </>
  )
}
