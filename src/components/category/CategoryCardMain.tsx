import { Box, Typography, Button, Grid } from '@mui/material'
import { useState } from 'react'
import { Add as AddIcon } from '@mui/icons-material'

// Components
import CategoryCard from './CategoryCard'
import CategoryListTable from './CategoryListTable'
import CategoryAddDrawer from './CategoryAddDrawer'
import CategoryEditDrawer from './CategoryEditDrawer'
import CategoryDetailDrawer from './CategoryDetailDrawer'
import ConfirmDialog from '../commons/ConfimDialog'

// Hooks
import { useCategories } from '../../hook/categories/useCategories'
import { useSoftDeleteCategory } from '../../hook/categories/useSoftDeleteCategories'

// Types
import type { Category } from '../../types/category'

const CategoryCardMain = () => {
  const { isPending, data } = useCategories()
  const { mutate: deleteCategory } = useSoftDeleteCategory()

  // Estados para modales y acciones
  const [openAddDrawer, setOpenAddDrawer] = useState(false)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [openDetailDrawer, setOpenDetailDrawer] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')

  // Handlers
  const handleAddCategory = () => setOpenAddDrawer(true)
  
  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setOpenEditDrawer(true)
  }
  
  const handleViewCategory = (category: Category) => {
    setSelectedCategory(category)
    setOpenDetailDrawer(true)
  }
  
  const handleDeleteCategory = (category: Category) => {
    setSelectedCategory(category)
    setOpenDeleteDialog(true)
  }
  
  const handleConfirmDelete = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory.id)
    }
    setOpenDeleteDialog(false)
    setSelectedCategory(null)
  }

  const handleCloseDrawers = () => {
    setOpenAddDrawer(false)
    setOpenEditDrawer(false)
    setOpenDetailDrawer(false)
    setSelectedCategory(null)
  }

  if (isPending) {
    return <Typography>Cargando categorías...</Typography>
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header con acciones */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant={viewMode === 'cards' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('cards')}
            size="small"
          >
            Vista de Tarjetas
          </Button>
          <Button
            variant={viewMode === 'table' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('table')}
            size="small"
          >
            Vista de Tabla
          </Button>
        </Box>
      </Box>

      {/* Contenido principal */}
      {Array.isArray(data) && data.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No hay categorías registradas
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Comienza creando tu primera categoría
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddCategory}
          >
            Crear Primera Categoría
          </Button>
        </Box>
      ) : (
        <>
          {viewMode === 'cards' ? (
            <Grid container spacing={3}>
              {data?.map((category) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                  <CategoryCard
                    item={category}
                    onEdit={handleEditCategory}
                    onDelete={handleDeleteCategory}
                    onView={handleViewCategory}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <CategoryListTable 
              categoryData={data} 
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
              onAdd={handleAddCategory}
              
            />
          )}
        </>
      )}

      {/* Modales */}
      <CategoryAddDrawer
        open={openAddDrawer}
        onClose={handleCloseDrawers}
      />

      <CategoryEditDrawer
        open={openEditDrawer}
        onClose={handleCloseDrawers}
        category={selectedCategory}
      />

      <CategoryDetailDrawer
        open={openDetailDrawer}
        onClose={handleCloseDrawers}
        onEdit={handleEditCategory}
        category={selectedCategory}
      />

      <ConfirmDialog
        open={openDeleteDialog}
        title="¿Eliminar categoría?"
        message={`¿Estás seguro de que deseas eliminar la categoría "${selectedCategory?.name}"? Esta acción no se puede deshacer.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenDeleteDialog(false)}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </Box>
  )
}

export default CategoryCardMain
