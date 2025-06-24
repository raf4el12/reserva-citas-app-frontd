import { useState } from 'react'
import { Box, LinearProgress, Typography, TextField } from '@mui/material'
import EntityCard from '../../components/commons/EntityCard'
import CardNew from '../../components/commons/CardNew'
import { useCategories } from '../../hook/categories/useCategories'
import { useRemoveCategories } from '../../hook/categories/useRemoveCategories'
import { useUpdateCategory } from '../../hook/categories/useUpdateCategories'
import ConfirmDialog from '../../components/commons/ConfimDialog'

const CategoryPage = () => {
  const { isPending, data } = useCategories()
  const removeCategory = useRemoveCategories()
  const updateCategory = useUpdateCategory()

  const [openDelete, setOpenDelete] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const [openSave, setOpenSave] = useState(false)
  const [pendingUpdate, setPendingUpdate] = useState<{ id: string; name: string } | null>(null)

  const handleDeleteClick = (id: string) => {
    setSelectedId(id)
    setOpenDelete(true)
  }

  const handleConfirmDelete = () => {
    if (selectedId) {
      removeCategory.mutate(selectedId)
    }
    setOpenDelete(false)
    setSelectedId(null)
  }

  const handleUpdate = (id: string, name: string) => {
    setPendingUpdate({ id, name })
    setOpenSave(true)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (pendingUpdate) {
      setPendingUpdate({ ...pendingUpdate, name: e.target.value })
    }
  }

  const handleConfirmSave = () => {
    if (pendingUpdate) {
      updateCategory.mutate({ id: pendingUpdate.id, name: pendingUpdate.name })
    }
    setOpenSave(false)
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
          <Typography variant="h4">No hay categorias</Typography>
        )}
        {data?.map((item) => (
          <EntityCard
            key={Number(item.id)}
            item={item}
            mainField="name"
            onDelete={handleDeleteClick}
            onUpdate={handleUpdate}
            getId={item => String(item.id)}
            detailUrl={item => `/admin/categories/${Number(item.id)}/detail`}
          />
        ))}
        <CardNew href="/admin/categories/new" />
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
        open={openSave}
        title="Editar categoría"
        message={
          <TextField
            fullWidth
            margin="normal"
            label="Nombre de la categoría"
            value={pendingUpdate?.name ?? ''}
            onChange={handleNameChange}
            autoFocus
          />
        }
        onConfirm={handleConfirmSave}
        onCancel={() => setOpenSave(false)}
        confirmText="Guardar"
        cancelText="Cancelar"
      />
    </>
  )
}

export default CategoryPage