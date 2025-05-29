import React, { FC } from "react"
import { Container } from "@mui/material"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: 2,
      }}>
      {children}
    </Container>
  )
}

export default Layout