export const formatDateAndTime = (date?: Date | string | null) => {
  if (!date) return ''

  const dateISOString =
    typeof date === 'string' ? `${date}T00:00` : date.toISOString()

  const dateString = dateISOString.slice(0, 16).replace('T', ' ')

  const [dateStr, timeStr] = dateString.split(' ')

  return `${dateStr.split('-').reverse().join('/')} ${timeStr}`
}

export const formatDate = (date?: Date | string) => {
  if (!date) return ''

  const dateString = formatDateAndTime(date)

  return dateString.slice(0, 10)
}

export const formatNumber = (value: number | string, round = 2) => {
  if (!value) return (0).toFixed(round)

  const currentValue =
    typeof value === 'string' ? Number.parseFloat(value) : value

  return currentValue.toLocaleString('en-US', {
    maximumFractionDigits: round,
    minimumFractionDigits: round,
  })
}

export const formatNumberSmart = (value: number | string, round = 2) => {
  if (value === null || value === undefined || value === '') return '0'

  const currentValue =
    typeof value === 'string' ? Number.parseFloat(value) : value

  const hasDecimals = !Number.isNaN(currentValue) && currentValue % 1 !== 0

  return currentValue.toLocaleString(
    'en-US',
    hasDecimals
      ? {
          maximumFractionDigits: round,
          minimumFractionDigits: round,
        }
      : {
          maximumFractionDigits: 0,
        }
  )
}