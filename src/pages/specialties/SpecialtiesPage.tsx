import { Box, LinearProgress, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import CardNew from '../../components/commons/CardNew'
import ConfirmDialog from '../../components/commons/ConfimDialog'
import SpecialtiesCard from '../../components/specialties/SpecialtiesCard'
import { useSpecialties } from '../../hook/specialties/useSpecialties'
import { useSpecialtiesRemove } from '../../hook/specialties/useSpecialtiesRemove'
import { useUpdateSpecialty } from '../../hook/specialties/useSpecialtiesUpdate'
import type { Specialties } from '../../types/specialties'

const SpecialtiesPage = () => {
  const { isPending, data } = useSpecialties()
  const removeSpecialty = useSpecialtiesRemove()
  const updateSpecialty = useUpdateSpecialty()

  const [openDelete, setOpenDelete] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // Estado para edición
  const [openEdit, setOpenEdit] = useState(false)
  const [pendingUpdate, setPendingUpdate] = useState<{
    id: number
    name: string
  } | null>(null)

  const handleDeleteClick = (id: number) => {
    setSelectedId(id)
    setOpenDelete(true)
  }

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      removeSpecialty.mutate(selectedId)
    }
    setOpenDelete(false)
    setSelectedId(null)
  }

  // Al hacer clic en editar, abre el diálogo de edición
  const handleEditClick = (id: number, name: string) => {
    setPendingUpdate({ id, name })
    setOpenEdit(true)
  }

  // Actualiza el nombre en el input
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (pendingUpdate) {
      setPendingUpdate({ ...pendingUpdate, name: e.target.value })
    }
  }

  // Confirma la edición
  const handleConfirmEdit = () => {
    if (pendingUpdate) {
      updateSpecialty.mutate({ id: pendingUpdate.id, name: pendingUpdate.name })
    }
    setOpenEdit(false)
    setPendingUpdate(null)
  }

  if (isPending) return <LinearProgress />

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {Array.isArray(data) && data.length === 0 && (
          <Typography variant="h4">No hay especialidades</Typography>
        )}
        {data?.map((item: Specialties) => (
          <SpecialtiesCard
            key={item.id}
            item={item}
            onDelete={handleDeleteClick}
            onUpdate={handleEditClick} // <-- Cambia a handleEditClick
            detailUrl={(item) => `/admin/specialties/${item.id}/detail`}
          />
        ))}
        <CardNew href="/admin/specialties/new" />
      </Box>
      {/* Diálogo de confirmación para eliminar */}
      <ConfirmDialog
        open={openDelete}
        title="¿Seguro que deseas eliminar?"
        message="Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenDelete(false)}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
      {/* Diálogo de edición para actualizar nombre */}
      <ConfirmDialog
        open={openEdit}
        title="Editar especialidad"
        message={
          <TextField
            fullWidth
            margin="normal"
            label="Nombre de la especialidad"
            value={pendingUpdate?.name ?? ''}
            onChange={handleNameChange}
            autoFocus
          />
        }
        onConfirm={handleConfirmEdit}
        onCancel={() => setOpenEdit(false)}
        confirmText="Guardar"
        cancelText="Cancelar"
      />
    </>
  )
}

export default SpecialtiesPage
