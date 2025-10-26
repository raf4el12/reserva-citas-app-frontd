import type { QueryClient } from '@tanstack/react-query'

type UpdateAction<T> =
  | { type: 'add'; item: T }
  | { type: 'update'; item: T; matchBy: keyof T }
  | { type: 'delete'; id: T[keyof T]; matchBy: keyof T }

export default function updateQueryArray<T>(
  queryClient: QueryClient,
  queryKey: unknown[],
  action: UpdateAction<T>
) {
  queryClient.setQueryData<T[] | undefined>(queryKey, (old) => {
    if (!old) {
      return action.type === 'add' ? [action.item] : []
    }

    switch (action.type) {
      case 'add':
        return [...old, action.item]

      case 'update':
        return old.map((el) =>
          el[action.matchBy] === action.item[action.matchBy] ? action.item : el
        )

      case 'delete':
        return old.filter((el) => el[action.matchBy] !== action.id)

      default:
        return old
    }
  })
}
