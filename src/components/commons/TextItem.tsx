import type { FC } from 'react'
import { formatDateAndTime } from '../../shared/utils/format'
import { isValidDateString } from '../../shared/utils/validation'

interface TextItem {
  title: string
  text?: string | number | Date | null
}

const TextItem: FC<TextItem> = ({ title, text }) => {
  const textFormat = isValidDateString(text)
    ? formatDateAndTime(text as any)
    : text

  return (
    <div className="flex flex-col mb-3">
      <span className="text-base">{String(textFormat)}</span>
      <span className="text-gray-500 text-xs">{title}</span>
    </div>
  )
}

export default TextItem
