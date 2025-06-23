import { Container } from '@mui/material'
import type React from 'react'
import type { FC } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: 2,
      }}
    >
      {children}
    </Container>
  )
}

export default Layout
