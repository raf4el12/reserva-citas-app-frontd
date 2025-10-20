import { TextField, type TextFieldProps } from '@mui/material'
import { useEffect, useState } from 'react'

interface DebouncedInputProps extends Omit<TextFieldProps, 'onChange'> {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: DebouncedInputProps) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return (
    <TextField
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default DebouncedInput
