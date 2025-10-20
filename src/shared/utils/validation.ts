export const isValidDateString = (value: unknown): boolean => {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}