import { Box, Grid, Icon, MenuItem, Theme, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface MenuItemProps {
  item: string
  icon: string
  param?: string
  height?: number
  width?: number
}

export const Item: React.FC<MenuItemProps> = ({
  item,
  icon,
  param,
  height = 25,
  width = 25,
}) => {
  const navigate = useNavigate()

  return (
    <MenuItem
      sx={{
        my: 2,
        borderRadius: '50px',
        '&:hover': {
          backgroundColor: (theme: Theme) => theme.myPalette.greyShadow,
        },
        transition: 'background-color 0.3s ease',
      }}
      onClick={() => param && navigate(`${param}`)}
    >
      <Grid container alignItems="center">
        <Grid item xs={2.5}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Icon
              sx={{
                display: 'flex',
                alignItems: 'center',
                overflow: 'visible',
                height: 'auto',
              }}
            >
              <img src={icon} height={height} width={width} />
            </Icon>
          </Box>
        </Grid>
        <Grid item xs={8.5}>
          <Typography variant="h6">{item}</Typography>
        </Grid>
      </Grid>
    </MenuItem>
  )
}
