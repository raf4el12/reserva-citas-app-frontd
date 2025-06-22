import type { FC, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const LayoutAuth: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center">
      {children}
    </div>
  )
}

export default LayoutAuth
