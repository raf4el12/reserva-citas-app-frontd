import type { FC } from 'react'
import type { User } from '../../types/user'

interface SidebarAvatarProps {
  user: User
}

const SidebarAvatar: FC<SidebarAvatarProps> = ({ user }) => {
  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
    : '?'

  return (
    <div className="flex items-center mt-4 p-2 gap-2 rounded-lg bg-gray-100">
      <div
        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700 focus:outline-none"
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
      </div>
      <div>
        <div className="text-sm font-semibold">{user?.name}</div>
        <div className="text-xs text-gray-500">{user?.email}</div>
      </div>
    </div>
  )
}

export default SidebarAvatar
