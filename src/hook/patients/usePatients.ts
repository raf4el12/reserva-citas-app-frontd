import { useQuery } from "@tanstack/react-query"

import ApiBackend from "../../shared/services/api.backend"
import type { Patients } from '../../types/patients'

export const usePatients = () => {
    const dataQuery = useQuery({
        queryKey: ['patients'],
        queryFn: async () => {
            const data = await ApiBackend.get('/patients')

            return data as Patients []
        }
    })

    return dataQuery
}