import { useMemo, useState } from 'react'
import type {
  Doctor,
  DoctorCreate,
  DoctorUpdateDto,
} from '../../../types/doctors/doctorSchema'
import {
  doctorCreateSchema,
  doctorUpdateSchema,
} from '../../../types/doctors/doctorSchema'

type DoctorFormMode = 'create' | 'edit'

interface DoctorFormState {
  userId: undefined
  name: string
  lastName: string
  email: string
  phone: string
  birthday: string // Uses 'birthday' to match database field
  gender: string
  address: string
  photo: string | File | Blob
  licenseNumber: string
  resume: string
  specialtyIds: any[]
}

const emptyFormState: DoctorFormState = {
  userId: undefined,
  name: '',
  lastName: '',
  email: '',
  phone: '',
  birthday: '',
  gender: '',
  address: '',
  photo: '',
  licenseNumber: '',
  resume: '',
  specialtyIds: [],
}

interface UseDoctorFormOptions {
  onCreate: (data: DoctorCreate) => Promise<any>
  onUpdate: (id: number, data: DoctorUpdateDto) => Promise<any>
}

export function useDoctorForm({ onCreate, onUpdate }: UseDoctorFormOptions) {
  const [formMode, setFormMode] = useState<DoctorFormMode>('create')
  const [formData, setFormData] = useState<DoctorFormState>(emptyFormState)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [actionDoctor, setActionDoctor] = useState<Doctor | null>(null)

  const openCreateForm = () => {
    setFormMode('create')
    setActionDoctor(null)
    setFormData(emptyFormState)
    setFormErrors({})
  }

  const openEditForm = (doctor: Doctor) => {
    if (!doctor || !doctor.id) {
      console.error('Invalid doctor object passed to openEditForm:', doctor)
      return
    }
    setFormMode('edit')
    setActionDoctor(doctor)
    setFormErrors({})
    setFormData(mapDoctorToFormData(doctor))
  }

  const closeForm = () => {
    setFormErrors({})
    setFormData(emptyFormState)
    setActionDoctor(null)
  }

  const handleFormChange = (field: keyof DoctorCreate, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    setFormErrors((prev) => {
      const next = { ...prev }
      delete next[field as string]
      if (field === 'specialtyIds') {
        for (const key of Object.keys(next)) {
          if (key.startsWith('specialtyIds')) {
            delete next[key]
          }
        }
      }
      return next
    })
  }

  const normalizePayload = (data: DoctorFormState) => {
    const specialtyIds = (data.specialtyIds ?? [])
      .filter((id) => id !== '' && id !== null && id !== undefined)
      .map((id) => Number(id))
      .filter((id) => !Number.isNaN(id))

    const userId =
      data.userId === undefined || data.userId === null
        ? undefined
        : data.userId

    // Handle photo - can be string, File, or Blob
    const photo =
      typeof data.photo === 'string'
        ? data.photo?.trim() || undefined
        : data.photo || undefined

    return {
      name: data.name?.trim(),
      lastName: data.lastName?.trim(),
      email: data.email?.trim(),
      phone: data.phone?.trim() || undefined,
      birthday: data.birthday || undefined,
      gender: data.gender || undefined,
      address: data.address?.trim() || undefined,
      photo,
      licenseNumber: data.licenseNumber?.trim(),
      resume: data.resume?.trim() || undefined,
      specialtyIds: specialtyIds.length ? specialtyIds : undefined,
      userId,
    }
  }

  const handleSubmitForm = async () => {
    const payload = normalizePayload(formData)

    if (formMode === 'create') {
      const validation = doctorCreateSchema.safeParse(payload)
      if (!validation.success) {
        const nextErrors: Record<string, string> = {}
        for (const issue of validation.error.issues) {
          const key = issue.path.join('.')
          nextErrors[key] = issue.message
        }
        setFormErrors(nextErrors)
        return
      }

      try {
        await onCreate(validation.data)
        closeForm()
      } catch (error) {
        console.error('Error al crear el doctor:', error)
      }
      return
    }

    const { userId: _unusedUserId, ...updatePayload } = payload
    const validation = doctorUpdateSchema.safeParse(updatePayload)
    if (!validation.success) {
      const nextErrors: Record<string, string> = {}
      for (const issue of validation.error.issues) {
        const key = issue.path.join('.')
        nextErrors[key] = issue.message
      }
      setFormErrors(nextErrors)
      return
    }

    if (!actionDoctor || !actionDoctor.id) {
      console.error(
        'Cannot update doctor: actionDoctor is invalid:',
        actionDoctor
      )
      return
    }

    try {
      await onUpdate(actionDoctor.id, validation.data)
      closeForm()
    } catch (error) {
      console.error('Error al actualizar el doctor:', error)
    }
  }

  const handleResetForm = () => {
    if (formMode === 'edit' && actionDoctor && actionDoctor.id) {
      setFormData(mapDoctorToFormData(actionDoctor))
    } else {
      setFormData(emptyFormState)
    }
    setFormErrors({})
  }

  const getSummary = useMemo(() => {
    const fullNamePreview =
      [formData.name, formData.lastName].filter(Boolean).join(' ') ||
      'Sin nombre asignado'
    const emailPreview = formData.email || 'Sin correo registrado'
    const licensePreview = formData.licenseNumber || 'Sin licencia médica'
    const specialtiesPreview =
      formData.specialtyIds && formData.specialtyIds.length > 0
        ? `${formData.specialtyIds.filter((id) => id !== '' && id !== null && id !== undefined).length} especialidad(es)`
        : 'Sin especialidades seleccionadas'

    return {
      fullName: fullNamePreview,
      email: emailPreview,
      license: licensePreview,
      specialties: specialtiesPreview,
    }
  }, [formData])

  return {
    formMode,
    formData,
    formErrors,
    actionDoctor,
    openCreateForm,
    openEditForm,
    closeForm,
    handleFormChange,
    handleSubmitForm,
    handleResetForm,
    getSummary,
  }
}

function mapDoctorToFormData(doctor: Doctor): DoctorFormState {
  return {
    userId: undefined,
    name: doctor.profile?.name ?? '',
    lastName: doctor.profile?.lastName ?? '',
    email: doctor.profile?.email ?? '',
    phone: doctor.profile?.phone ?? '',
    birthday: doctor.profile?.birthday ?? '', // Uses 'birthday' from database
    gender: '',
    address: doctor.profile?.address ?? '',
    photo: doctor.profile?.photo ?? '',
    licenseNumber: doctor.licenseNumber ?? '',
    resume: doctor.resume ?? '',
    specialtyIds:
      doctor.specialties?.map((item) => item.specialty?.id ?? item.id) ?? [],
  }
}
