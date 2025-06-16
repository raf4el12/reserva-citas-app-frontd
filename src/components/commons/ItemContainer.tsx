import { Box } from '@mui/material'
import type React from 'react'
import type { FC } from 'react'

interface ItemContainerProps {
  children: React.ReactNode
}

const ItemContainer: FC<ItemContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  )
}

export default ItemContainer
