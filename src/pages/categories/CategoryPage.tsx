import { useState } from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'
import EntityCard from '../../components/commons/EntityCard'
import CardNew from '../../components/commons/CardNew'
import { useCategories } from '../../hook/categories/useCategories'
import { useRemoveCategories } from '../../hook/categories/useRemoveCategories'
import { useUpdateCategory } from '../../hook/categories/useUpdateCategories'
import ConfirmDialog from '../../components/commons/ConfimDialog'

const CategoryPage = () => {
  const { isPending, ...categories } = useCategories()
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
        {!categories?.data && (
          <Typography variant="h4">No hay categorias</Typography>
        )}
        {categories?.data?.map((item) => (
          <EntityCard
            key={item.id}
            item={item}
            mainField="name"
            onDelete={handleDeleteClick}
            onUpdate={handleUpdate}
            getId={item => item.id}
            detailUrl={item => `/admin/categories/${item.id}/detail`}
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
      {/* Diálogo de confirmación para guardar cambios */}
      <ConfirmDialog
        open={openSave}
        title="¿Seguro que deseas guardar los cambios?"
        message="Se actualizará el nombre de la categoría."
        onConfirm={handleConfirmSave}
        onCancel={() => setOpenSave(false)}
        confirmText="Guardar"
        cancelText="Cancelar"
      />
    </>
  )
}

export default CategoryPage