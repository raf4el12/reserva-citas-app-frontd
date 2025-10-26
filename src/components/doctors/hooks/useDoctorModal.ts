import { useState } from 'react'
import type { Doctor } from '../../../types/doctors/doctorSchema'

export function useDoctorModal() {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const [formOpen, setFormOpen] = useState(false)
  const [detailDoctor, setDetailDoctor] = useState<Doctor | null>(null)
  const [actionDoctor, setActionDoctor] = useState<Doctor | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleViewDoctor = (doctor: Doctor) => {
    setDetailDoctor(doctor)
  }

  const handleDetailClose = () => {
    setDetailDoctor(null)
  }

  const handleDeleteRequest = (doctor: Doctor) => {
    if (!doctor || !doctor.id) {
      console.error(
        'Invalid doctor object passed to handleDeleteRequest:',
        doctor
      )
      return
    }
    setActionDoctor(doctor)
    setConfirmOpen(true)
  }

  const handleConfirmDelete = (onDelete: (id: number) => void) => {
    if (actionDoctor?.id) {
      onDelete(actionDoctor.id)
    } else {
      console.error('Cannot delete: actionDoctor is invalid:', actionDoctor)
    }
    setConfirmOpen(false)
    setActionDoctor(null)
  }

  const handleCancelDelete = () => {
    setConfirmOpen(false)
    setActionDoctor(null)
  }

  return {
    viewMode,
    setViewMode,
    formOpen,
    setFormOpen,
    detailDoctor,
    actionDoctor,
    confirmOpen,
    handleViewDoctor,
    handleDetailClose,
    handleDeleteRequest,
    handleConfirmDelete,
    handleCancelDelete,
  }
}
