import { Add as AddIcon } from '@mui/icons-material'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useState } from 'react'

import { useSpecialties } from '../../hook/specialties/useSpecialties'
import { useSpecialtiesRemove } from '../../hook/specialties/useSpecialtiesRemove'
import type { Specialties } from '../../types/specialties/specialties'
import ConfirmDialog from '../commons/ConfimDialog'
import SpecialtiesAddDrawer from './SpecialtiesAddDrawer'
import SpecialtiesCard from './SpecialtiesCard'
import SpecialtiesDetailDrawer from './SpecialtiesDetailDrawer'
import SpecialtiesEditDrawer from './SpecialtiesEditDrawer'
import SpecialtiesListTable from './SpecialtiesListTable'

type ViewMode = 'cards' | 'table'

const SpecialtiesCardMain = () => {
  const { data, isPending, isLoading } = useSpecialties()
  const { mutate: deleteSpecialty } = useSpecialtiesRemove()

  const [viewMode, setViewMode] = useState<ViewMode>('cards')
  const [openAddDrawer, setOpenAddDrawer] = useState(false)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [openDetailDrawer, setOpenDetailDrawer] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<Specialties | null>(null)

  const handleAddSpecialty = () => setOpenAddDrawer(true)

  const handleEditSpecialty = (specialty: Specialties) => {
    setSelectedSpecialty(specialty)
    setOpenEditDrawer(true)
  }

  const handleViewSpecialty = (specialty: Specialties) => {
    setSelectedSpecialty(specialty)
    setOpenDetailDrawer(true)
  }

  const handleDeleteSpecialty = (specialty: Specialties) => {
    setSelectedSpecialty(specialty)
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    if (selectedSpecialty) {
      deleteSpecialty(selectedSpecialty.id)
    }
    setOpenDeleteDialog(false)
    setSelectedSpecialty(null)
  }

  const handleCloseDrawers = () => {
    setOpenAddDrawer(false)
    setOpenEditDrawer(false)
    setOpenDetailDrawer(false)
    setSelectedSpecialty(null)
  }

  const isDataLoading =
    typeof isPending !== 'undefined' ? isPending : (isLoading ?? false)

  if (isDataLoading) {
    return <Typography>Cargando especialidades...</Typography>
  }

  const hasSpecialties = Array.isArray(data) && data.length > 0

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
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

      {!hasSpecialties ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No hay especialidades registradas
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Comienza creando tu primera especialidad
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddSpecialty}
          >
            Crear Primera Especialidad
          </Button>
        </Box>
      ) : (
        <>
          {viewMode === 'cards' ? (
            <Grid container spacing={3}>
              {data?.map((specialty) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={specialty.id}>
                  <SpecialtiesCard
                    item={specialty}
                    onView={handleViewSpecialty}
                    onEdit={handleEditSpecialty}
                    onDelete={handleDeleteSpecialty}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <SpecialtiesListTable
              specialtyData={data || []}
              onEdit={handleEditSpecialty}
              onDelete={handleDeleteSpecialty}
              onAdd={handleAddSpecialty}
            />
          )}
        </>
      )}

      <SpecialtiesAddDrawer open={openAddDrawer} onClose={handleCloseDrawers} />

      <SpecialtiesEditDrawer
        open={openEditDrawer}
        onClose={handleCloseDrawers}
        specialty={selectedSpecialty}
      />

      <SpecialtiesDetailDrawer
        open={openDetailDrawer}
        onClose={handleCloseDrawers}
        specialty={selectedSpecialty}
        onEdit={handleEditSpecialty}
      />

      <ConfirmDialog
        open={openDeleteDialog}
        title="¿Eliminar especialidad?"
        message={`¿Estás seguro de que deseas eliminar la especialidad "${selectedSpecialty?.name}"? Esta acción no se puede deshacer.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenDeleteDialog(false)}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </Box>
  )
}

export default SpecialtiesCardMain
