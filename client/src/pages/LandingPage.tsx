import { Button, Container, Divider, Theme, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

import twLogo from '../assets/twitter-logo.svg'
import { useEffect, useState } from 'react'
import { RegisterModal } from '../components/modals/RegisterModal'
import { LoginModal } from '../components/modals/LoginModal'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export const LandingPage: React.FC = () => {
  const [openRegister, setOpenRegister] = useState<boolean>(false)
  const [openLogin, setOpenLogin] = useState<boolean>(false)

  const { isLoggedIn, user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/${user?.username}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, navigate])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={twLogo} alt="Twitter" />
          </Container>
        </Grid>

        <Grid item xs={12} md={6}>
          <Container style={{ height: '100%' }}>
            <Typography
              variant="h1"
              gutterBottom
              style={{ fontWeight: 'bold' }}
            >
              Happening now
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ fontWeight: 'bold' }}
                >
                  Join today.
                </Typography>
                <Button
                  onClick={() => setOpenRegister(true)}
                  variant="contained"
                  style={{ width: '100%', borderRadius: 50 }}
                >
                  Create account
                </Button>

                {/* *************************************** */}
                <Divider
                  sx={{
                    borderColor: (theme: Theme) => theme.myPalette.greyDivider,
                  }}
                  style={{ height: '1px', marginTop: 30 }}
                />
                {/* *************************************** */}

                <Typography
                  style={{
                    fontWeight: 'bold',
                    marginTop: 30,
                    marginBottom: 10,
                  }}
                >
                  Already have an account?
                </Typography>
                <Button
                  onClick={() => setOpenLogin(true)}
                  variant="outlined"
                  style={{ width: '100%', borderRadius: 50 }}
                >
                  Sign in
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <RegisterModal
        visible={openRegister}
        close={() => setOpenRegister(false)}
      />
      <LoginModal
        visible={openLogin}
        close={() => setOpenLogin(false)}
        openRegister={() => setOpenRegister(true)}
      />
    </>
  )
}
