import { useQuery } from '@tanstack/react-query'

import ApiBackend from '../../shared/services/api.backend'
import type { Schedule } from '../../types/schedules'

export const useGetScheduleById = (scheduleId: number) => {
  const query = useQuery({
    queryKey: ['schedule', scheduleId],
    queryFn: async () => {
      if (!scheduleId) return null

      const data = await ApiBackend.get(`/schedules/${scheduleId}`)

      return data as Schedule
    },
    enabled: !!scheduleId,
  })

  return query
}
