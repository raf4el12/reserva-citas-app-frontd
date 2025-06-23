import { Divider } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import type { User } from '../../types/user'

interface DropdownAvatarProps {
  user: User
  onLogout: () => void
}

const DropdownAvatar: React.FC<DropdownAvatarProps> = ({ onLogout, user }) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
    : '?'

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir menú de usuario"
      >
        {user?.photo ? (
          <img
            src={user.photo}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-50">
          <a
            href="/admin/perfil"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Perfil
          </a>
          <Divider />
          <button
            type="button"
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => {
              setOpen(false)
              onLogout()
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}

export default DropdownAvatar
