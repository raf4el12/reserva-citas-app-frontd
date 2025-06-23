import { Link, Typography } from '@mui/material'
import type { FC, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  icon?: ReactNode
}

const LayoutAuth: FC<LayoutProps> = ({ children, icon }) => {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-full">
      <div className="border border-gray-100 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center justify-center gap-2">
          <Typography
            className="!text-3xl !font-bold text-primary pb-3"
            align="center"
            variant="h4"
            component={Link}
            underline="none"
            href="/"
          >
            Sisol
          </Typography>
          {icon && <span className="text-5xl">{icon}</span>}
        </div>
        {children}
      </div>
    </div>
  )
}

export default LayoutAuth
