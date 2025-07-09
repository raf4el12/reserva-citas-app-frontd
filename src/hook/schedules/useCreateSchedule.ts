import { useMutation } from "@tanstack/react-query";

import ApiBackend from "../../shared/services/api.backend";
import type { Schedule, ScheduleCreateDto } from "../../types/schedules";

export const useSchedulesCreate = () => {
    return useMutation ({
        mutationFn: async (newSchedule: ScheduleCreateDto) => {
            const data = await ApiBackend.post('/schedules', newSchedule)
            return data as Schedule
        }
    })
}