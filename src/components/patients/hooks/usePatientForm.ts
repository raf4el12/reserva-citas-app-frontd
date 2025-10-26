import { useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  patientCreateSchema,
  patientUpdateSchema,
} from '../../../types/patients/patientSchema'
import type {
  Patient,
  PatientCreate,
  PatientUpdateDto,
} from '../../../types/patients/patientSchema'

interface UsePatientFormProps {
  onCreate: (data: PatientCreate) => Promise<Patient>
  onUpdate: (id: number, data: PatientUpdateDto) => Promise<Patient>
}

export function usePatientForm({ onCreate, onUpdate }: UsePatientFormProps) {
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [formData, setFormData] = useState<PatientCreate>({
    name: '',
    lastName: '',
    email: '',
    emergencyContact: '',
    bloodType: 'A+',
    birthday: undefined,
    photo: undefined,
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const validateForm = (data: any) => {
    try {
      if (formMode === 'create') {
        patientCreateSchema.parse(data)
      } else {
        patientUpdateSchema.parse(data)
      }
      return { isValid: true, errors: {} }
    } catch (error: any) {
      const errors: Record<string, string> = {}
      if (error.errors) {
        for (const err of error.errors) {
          const field = err.path[0]
          errors[field] = err.message
        }
      }
      return { isValid: false, errors }
    }
  }

  const openCreateForm = () => {
    setFormMode('create')
    setEditingPatient(null)
    setFormData({
      name: '',
      lastName: '',
      email: '',
      emergencyContact: '',
      bloodType: 'A+',
      birthday: undefined,
      photo: undefined,
    })
    setFormErrors({})
  }

  const openEditForm = (patient: Patient) => {
    setFormMode('edit')
    setEditingPatient(patient)
    setFormData({
      name: patient.profile.name,
      lastName: patient.profile.lastName,
      email: patient.profile.email,
      phone: patient.profile.phone || '',
      birthday: patient.profile.birthday || '',
      gender: '',
      address: patient.profile.address || '',
      emergencyContact: patient.emergencyContact,
      bloodType: patient.bloodType,
      allergies: patient.allergies || '',
      chronic_conditions: patient.chronic_conditions || '',
      photo: undefined,
    })
    setFormErrors({})
  }

  const closeForm = () => {
    setFormMode('create')
    setEditingPatient(null)
    setFormData({
      name: '',
      lastName: '',
      email: '',
      emergencyContact: '',
      bloodType: 'A+',
      birthday: undefined,
      photo: undefined,
    })
    setFormErrors({})
  }

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmitForm = async () => {
    // Validate form data
    const validation = validateForm(formData)
    if (!validation.isValid) {
      setFormErrors(validation.errors)
      toast.error('Por favor, llena todos los campos requeridos')
      return
    }

    try {
      if (formMode === 'create') {
        await onCreate(formData)
      } else if (editingPatient) {
        await onUpdate(editingPatient.id, formData)
      }
      closeForm()
    } catch (error: any) {
      console.error('Form submission error:', error)
      setFormErrors({
        root: error.message || 'Error al procesar el formulario',
      })
      toast.error(error.message || 'Error al procesar el formulario')
    }
  }

  const handleResetForm = () => {
    if (formMode === 'create') {
      openCreateForm()
    } else if (editingPatient) {
      openEditForm(editingPatient)
    }
  }

  const getSummary = {
    fullName: `${formData.name} ${formData.lastName}`.trim(),
    email: formData.email,
    emergencyContact: formData.emergencyContact,
    bloodType: formData.bloodType,
    allergies: formData.allergies || 'Ninguna',
    chronicConditions: formData.chronic_conditions || 'Ninguna',
  }

  return {
    formMode,
    editingPatient,
    formData,
    formErrors,
    openCreateForm,
    openEditForm,
    closeForm,
    handleFormChange,
    handleSubmitForm,
    handleResetForm,
    getSummary,
  }
}
