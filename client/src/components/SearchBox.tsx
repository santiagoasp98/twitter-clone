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
        },
      }}
      sx={{
        borderRadius: '50px',
        marginTop: '5px',
      }}
    />
  )
}
