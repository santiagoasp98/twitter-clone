import { Box, Icon, MenuItem, Theme, Typography } from '@mui/material'
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
      <Box display="flex" alignItems="flex-start">
        <Icon sx={{ mr: 2.5, overflow: 'visible' }}>
          <img src={icon} height={height} width={width} />
        </Icon>
        <Typography variant="h6">{item}</Typography>
      </Box>
    </MenuItem>
  )
}
