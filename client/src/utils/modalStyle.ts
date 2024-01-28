import { Theme } from '@mui/material'

interface ModalStyleProps {
  width?: number | string
  height?: number | string
  top?: string
  left?: string
  overflow?: string
  justifyContent?: string
  p?: number
}

const getModalStyle = (theme: Theme, props: ModalStyleProps = {}) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute' as const,
  top: props.top ? `${props.top}` : '50%',
  left: props.left ? `${props.left}` : '50%',
  transform: 'translate(-50%, -50%)',
  width: props.width || 500,
  height: props.height || 'auto',
  bgcolor: '#000',
  boxShadow: 24,
  borderRadius: 5,
  border: `1px solid ${theme.myPalette.greyDivider}`,
  p: props.p || 0,
  overflow: props.overflow || 'hidden',
  justifyContent: props.justifyContent || 'initial',
})

export default getModalStyle
