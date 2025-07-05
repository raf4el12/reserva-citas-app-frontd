import { Box, LinearProgress, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardNew from '../../components/commons/CardNew'
import ConfirmDialog from '../../components/commons/ConfimDialog'
import ProfileCard from '../../components/profiles/ProfileCard'
import { useProfiles } from '../../hook/profiles/useProfiles'
import { useProfilesRemove } from '../../hook/profiles/useProfilesRemove'
import type { Profile } from '../../types/profile'

const ProfilesPage = () => {
  const { isPending, data } = useProfiles()
  const removeProfile = useProfilesRemove()
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const navigate = useNavigate()

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
            onUpdate={() => navigate(`/admin/profiles/update/${item.id}`)}
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
    </>
  )
}

export default ProfilesPage
