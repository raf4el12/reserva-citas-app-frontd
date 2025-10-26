import { useCreatePatients } from '../../../hook/patients/useCreatedPatients'
import { useDeletePatients } from '../../../hook/patients/useDeletePatients'
import { usePatients } from '../../../hook/patients/usePatients'
import { useUpdatePatient } from '../../../hook/patients/usePatientsUpdate'
import { useCreateProfiles } from '../../../hook/profiles/useCreatedProfiles'
import { usePatientForm } from './usePatientForm'
import { usePatientModal } from './usePatientModal'

export function usePatient() {
  const { data: patients, isPending: patientsLoading } = usePatients()
  const createPatient = useCreatePatients()
  const createProfile = useCreateProfiles()
  const updatePatient = useUpdatePatient()
  const deletePatient = useDeletePatients()

  const isSubmitting =
    createPatient.isPending ||
    createProfile.isPending ||
    updatePatient.isPending

  const formHook = usePatientForm({
    onCreate: async (data) => {
      // First create the profile
      const profile = await createProfile.mutateAsync(data)
      // Then create the patient with the profile ID
      return createPatient.mutateAsync({
        profileId: profile.id,
        emergencyContact: data.emergencyContact,
        bloodType: data.bloodType,
        allergies: data.allergies,
        chronic_conditions: data.chronic_conditions,
      })
    },
    onUpdate: (id, data) => updatePatient.mutateAsync({ id, ...data }),
  })

  const modalHook = usePatientModal()

  const openCreateForm = () => {
    formHook.openCreateForm()
    modalHook.setFormOpen(true)
  }

  const openEditForm = (patient: any) => {
    formHook.openEditForm(patient)
    modalHook.setFormOpen(true)
  }

  const closeForm = () => {
    modalHook.setFormOpen(false)
    formHook.closeForm()
  }

  const handleDelete = () => {
    modalHook.handleConfirmDelete((id) => deletePatient.mutate(id))
  }

  return {
    patients,
    patientsLoading,
    isSubmitting,
    formHook,
    modalHook,
    openCreateForm,
    openEditForm,
    closeForm,
    handleDelete,
  }
}
