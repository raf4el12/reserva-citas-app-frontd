import { useState } from 'react'
import type { Patient } from '../../../types/patients/patientSchema'

export function usePatientModal() {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const [formOpen, setFormOpen] = useState(false)
  const [detailPatient, setDetailPatient] = useState<Patient | null>(null)
  const [actionPatient, setActionPatient] = useState<Patient | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleViewPatient = (patient: Patient) => {
    setDetailPatient(patient)
  }

  const handleDetailClose = () => {
    setDetailPatient(null)
  }

  const handleDeleteRequest = (patient: Patient) => {
    if (!patient || !patient.id) {
      console.error(
        'Invalid patient object passed to handleDeleteRequest:',
        patient
      )
      return
    }
    setActionPatient(patient)
    setConfirmOpen(true)
  }

  const handleConfirmDelete = (onDelete: (id: number) => void) => {
    if (actionPatient?.id) {
      onDelete(actionPatient.id)
      setConfirmOpen(false)
      setActionPatient(null)
    }
  }

  const handleCancelDelete = () => {
    setConfirmOpen(false)
    setActionPatient(null)
  }

  return {
    viewMode,
    setViewMode,
    formOpen,
    setFormOpen,
    detailPatient,
    actionPatient,
    confirmOpen,
    handleViewPatient,
    handleDetailClose,
    handleDeleteRequest,
    handleConfirmDelete,
    handleCancelDelete,
  }
}
