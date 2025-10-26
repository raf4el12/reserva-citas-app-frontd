import { useMemo } from 'react'
import type { Specialties } from '../../../types/specialties/specialties'

interface SpecialtyOption {
  id: number
  name: string
  description?: string
}

export function useSpecialtyOptions(specialtiesData?: Specialties[]) {
  const specialtyOptions: SpecialtyOption[] = useMemo(() => {
    if (!Array.isArray(specialtiesData)) return []
    return specialtiesData.map((item: Specialties) => ({
      id: item.id,
      name: item.name,
      description: item.description ?? undefined,
    }))
  }, [specialtiesData])

  return specialtyOptions
}
