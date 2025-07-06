import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useLocation } from 'react-router'

import { SHOW_TOGGLE_VIEW_TITLES, TITLES } from './constants'

export type ToggleViewType = 'list' | 'module'

interface LayoutAdminState {
  showToggleView: boolean
  toggleView: ToggleViewType
  onShowToggleView: (value: boolean) => void
  onToggleView: (value: ToggleViewType) => void
  title: string
}

const LayoutAdminContext = createContext<LayoutAdminState | undefined>(
  undefined
)

interface AuthProviderProps {
  children: ReactNode
}

export const LayoutAdminProvider = ({ children }: AuthProviderProps) => {
  const location = useLocation()
  const [showToggleView, setShowToggleView] = useState(false)
  const [toggleView, setToggleView] = useState<ToggleViewType>('module')

  const title = useMemo(() => {
    const found = Object.entries(TITLES).find(([path]) =>
      location.pathname.startsWith(path)
    )
    return found ? found[1] : ''
  }, [location.pathname])

  useEffect(() => {
    const showToggleView = SHOW_TOGGLE_VIEW_TITLES.some((el) => el === title)

    handleShowToggleView(showToggleView)
  }, [title])

  const handleShowToggleView = (value: boolean) => {
    setShowToggleView(value)
  }

  const handleToggleView = (value: ToggleViewType) => {
    setToggleView(value)
  }

  const value: LayoutAdminState = {
    showToggleView,
    toggleView,
    onShowToggleView: handleShowToggleView,
    onToggleView: handleToggleView,
    title,
  }

  return (
    <LayoutAdminContext.Provider value={value}>
      {children}
    </LayoutAdminContext.Provider>
  )
}

const useLayoutAdminContext = () => {
  const context = useContext(LayoutAdminContext)
  if (context === undefined) {
    throw new Error(
      'useLayoutAdminContext must be used within an LayoutAdminProvider'
    )
  }
  return context
}

export default useLayoutAdminContext
