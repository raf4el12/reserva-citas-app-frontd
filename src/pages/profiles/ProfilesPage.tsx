import { Box, LinearProgress, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import CardNew from '../../components/commons/CardNew'
import ConfirmDialog from '../../components/commons/ConfimDialog'
import ProfileCard from '../../components/profile/ProfileCard'
import { useProfiles } from '../../hook/profiles/useProfiles'
import { useProfilesRemove } from '../../hook/profiles/useProfilesRemove'
import { useUpdateProfile } from '../../hook/profiles/useProfilesUpdate'
import type { Profile } from '../../types/profile'

const ProfilesPage = () => {
  const { isPending, data } = useProfiles()
  const removeProfile = useProfilesRemove()
  const updateProfile = useUpdateProfile()

  const [openDelete, setOpenDelete] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // Estado para edición (igual que en CategoryPage)
  const [openEdit, setOpenEdit] = useState(false)
  const [pendingUpdate, setPendingUpdate] = useState<Profile | null>(null)

  const handleDeleteClick = (id: number) => {
    setSelectedId(id)
    setOpenDelete(true)
  }

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      removeProfile.mutate(selectedId)
    }
    setOpenDelete(false)
    setSelectedId(null)
  }

  // Al hacer clic en editar, abre el diálogo de edición
  const handleEditClick = (profile: Profile) => {
    setPendingUpdate(profile)
    setOpenEdit(true)
  }

  // Actualiza los campos en el input
  const handleFieldChange = (field: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (pendingUpdate) {
      setPendingUpdate({ ...pendingUpdate, [field]: e.target.value })
    }
  }

  // Confirma la edición
  const handleConfirmEdit = () => {
    if (pendingUpdate) {
      // Solo envía los campos que tu backend espera actualizar
      updateProfile.mutate({
        id: pendingUpdate.id,
        name: pendingUpdate.name,
        lastName: pendingUpdate.lastName,
        email: pendingUpdate.email,
      })
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
          <Typography variant="h4">No hay perfiles</Typography>
        )}
        {data?.map((item: Profile) => (
          <ProfileCard
            key={item.id}
            item={item}
            onDelete={handleDeleteClick}
            onUpdate={() => handleEditClick(item)}
            detailUrl={(item) => `/admin/profiles/${item.id}/detail`}
          />
        ))}
        <CardNew href="/admin/profiles/new" />
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
      {/* Diálogo de edición para actualizar nombre, apellido y email */}
      <ConfirmDialog
        open={openEdit}
        title="Editar perfil"
        message={
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Nombre"
              value={pendingUpdate?.name ?? ''}
              onChange={handleFieldChange('name')}
              autoFocus
            />
            <TextField
              fullWidth
              margin="normal"
              label="Apellido"
              value={pendingUpdate?.lastName ?? ''}
              onChange={handleFieldChange('lastName')}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={pendingUpdate?.email ?? ''}
              onChange={handleFieldChange('email')}
              type="email"
            />
          </>
        }
        onConfirm={handleConfirmEdit}
        onCancel={() => setOpenEdit(false)}
        confirmText="Guardar"
        cancelText="Cancelar"
      />
    </>
  )
}

export default ProfilesPage