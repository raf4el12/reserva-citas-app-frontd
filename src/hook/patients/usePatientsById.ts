import { useQuery } from '@tanstack/react-query'

import ApiBackend from '../../shared/services/api.backend'
import type { Patients } from '../../types/patients/patientSchema'

export const useGetPatientsById = (patientsId: number) => {
  const query = useQuery({
    queryKey: ['patients', patientsId],
    queryFn: async () => {
      if (!patientsId) return null

      const data = await ApiBackend.get(`/patients/${patientsId}`)

      return data as Patients
    },
    enabled: !!patientsId,
  })

  return query
}
