import { TextField, InputAdornment, Theme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export const SearchBox: React.FC = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        sx: {
          borderRadius: '50px',
          height: 45,
          bgcolor: (theme: Theme) => theme.myPalette.greyBackground,
          borderColor: 'red',
        },
      }}
      sx={{
        borderRadius: '50px',
        marginTop: '5px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: (theme: Theme) => theme.myPalette.greyBackground,
          },
          '&:hover fieldset': {
            borderColor: (theme: Theme) => theme.myPalette.greyBackground,
          },
          '&.Mui-focused fieldset': {
            borderColor: (theme: Theme) => theme.myPalette.greyBackground,
          },
        },
      }}
    />
  )
}
