import React, { FC } from 'react'
import { Box } from '@mui/material'

interface ItemContainerProps {
  children: React.ReactNode;
}

const ItemContainer: FC<ItemContainerProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
      {children}
    </Box>
  )
}

export default ItemContainer