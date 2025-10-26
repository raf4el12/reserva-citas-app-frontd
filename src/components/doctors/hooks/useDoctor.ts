import { useCreateDoctor } from '../../../hook/doctors/useCreateDoctor'
import { useDeleteDoctor } from '../../../hook/doctors/useDeleteDoctor'
import { useDoctors } from '../../../hook/doctors/useDoctors'
import { useUpdateDoctor } from '../../../hook/doctors/useDoctorsUpdate'
import { useSpecialties } from '../../../hook/specialties/useSpecialties'
import { useDoctorForm } from './useDoctorForm'
import { useDoctorModal } from './useDoctorModal'
import { useSpecialtyOptions } from './useSpecialtyOptions'

export function useDoctor() {
  const { data: doctors, isPending: doctorsLoading } = useDoctors()
  const { data: specialtiesData } = useSpecialties()
  const createDoctor = useCreateDoctor()
  const updateDoctor = useUpdateDoctor()
  const deleteDoctor = useDeleteDoctor()

  const isSubmitting = createDoctor.isPending || updateDoctor.isPending

  const formHook = useDoctorForm({
    onCreate: (data) => createDoctor.mutateAsync(data),
    onUpdate: (id, data) => updateDoctor.mutateAsync({ id, ...data }),
  })

  const modalHook = useDoctorModal()
  const specialtyOptions = useSpecialtyOptions(specialtiesData)

  const openCreateForm = () => {
    formHook.openCreateForm()
    modalHook.setFormOpen(true)
  }

  const openEditForm = (doctor: any) => {
    formHook.openEditForm(doctor)
    modalHook.setFormOpen(true)
  }

  const closeForm = () => {
    modalHook.setFormOpen(false)
    formHook.closeForm()
  }

  const handleDelete = () => {
    modalHook.handleConfirmDelete((id) => deleteDoctor.mutate(id))
  }

  return {
    doctors,
    doctorsLoading,
    specialtyOptions,

    isSubmitting,

    formHook,

    modalHook,

    openCreateForm,
    openEditForm,
    closeForm,
    handleDelete,
  }
}
