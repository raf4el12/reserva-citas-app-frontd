import type { FC } from 'react'

interface TextItem {
  title: string
  text?: string | number | Date | null
}

const TextItem: FC<TextItem> = ({ title, text }) => {
  return (
    <div className="flex flex-col mb-3">
      <span className="text-base">{String(text)}</span>
      <span className="text-gray-500 text-xs">{title}</span>
    </div>
  )
}

export default TextItem
