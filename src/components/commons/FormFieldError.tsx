import type { FC, ReactNode } from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const FormFieldError: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="bg-red-100 text-red-700 rounded px-4 py-2 mt-1 text-sm flex items-center gap-2">
    <ErrorOutlineIcon fontSize="small" className="text-red-400" />
    <span>{children}</span>
  </div>
)

export default FormFieldError