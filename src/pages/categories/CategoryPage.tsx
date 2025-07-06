import { Box, LinearProgress, Typography } from '@mui/material'
import { useMatch, useNavigate, useParams } from 'react-router'

import CategoryEdit from '../../components/categories/CategoryEdit'
import CategoryItems from '../../components/categories/CategoryItems'
import CategoryNew from '../../components/categories/CategoryNew'
import CategoryView from '../../components/categories/CategoryView'
import DialogItem from '../../components/commons/DialogItem'
import { useCategories } from '../../hook/categories/useCategories'

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isPending, ...categories } = useCategories()
  const viewDetail = Boolean(useMatch('/admin/categories/:id/detail'))
  const viewEdit = Boolean(useMatch('/admin/categories/:id/edit'))
  const viewNew = Boolean(useMatch('/admin/categories/new'))

  const handleCloseDialogItem = () => {
    navigate('/admin/categories')
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
        <CategoryItems categories={categories?.data ?? []} />
      </Box>
      {viewNew && (
        <DialogItem open onClose={handleCloseDialogItem}>
          <CategoryNew onSuccess={handleCloseDialogItem} />
        </DialogItem>
      )}
      {viewDetail && (
        <DialogItem open onClose={handleCloseDialogItem}>
          <CategoryView id={Number(id)} />
        </DialogItem>
      )}
      {viewEdit && (
        <DialogItem open onClose={handleCloseDialogItem}>
          <CategoryEdit id={Number(id)} onSuccess={handleCloseDialogItem} />
        </DialogItem>
      )}
    </>
  )
}

export default CategoryPage
