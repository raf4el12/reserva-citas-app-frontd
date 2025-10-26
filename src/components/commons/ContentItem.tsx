import type { FC, ReactNode } from 'react'

interface ContentItemProps {
  children: ReactNode
}

const ContentItem: FC<ContentItemProps> = ({ children }) => {
  return (
    <div className="min-w-md max-w-xl mx-auto bg-white rounded-xl shadow-lg p-4 border border-gray-100">
      {children}
    </div>
  )
}

export default ContentItem
