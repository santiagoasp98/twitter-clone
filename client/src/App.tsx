import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import './App.css'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { AuthProvider } from './context/AuthContext'

declare module '@mui/material/styles' {
  interface Theme {
    myPalette: {
      greyFont: string
      greyShadow: string
      darkGreyShadow: string
      greyBackground: string
      greyDivider: string
    }
  }
  interface ThemeOptions {
    myPalette?: {
      greyFont?: string
      greyShadow?: string
      darkGreyShadow?: string
      greyBackground?: string
      greyDivider?: string
    }
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  myPalette: {
    greyFont: 'rgba(170, 170, 170, 0.8)',
    greyShadow: 'rgba(32, 28, 28, 0.8)',
    darkGreyShadow: 'rgba(43, 43, 43, 0.8)',
    greyBackground: 'rgba(30, 30, 30, 0.8)',
    greyDivider: 'rgba(61, 61, 61, 0.8)',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#000',

          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#2b2b2b',
            width: '12px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#6b6b6b',
            minHeight: 24,
            border: '3px solid #2b2b2b',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#2b2b2b',
          },
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
