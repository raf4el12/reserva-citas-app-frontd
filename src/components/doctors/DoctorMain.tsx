import { Add as AddIcon } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import ConfirmDialog from '../commons/ConfimDialog'
import DoctorCard from './components/DoctorCard'
import DoctorDetailsProfile from './components/DoctorDetailsProfile'
import DoctorInformation from './components/DoctorInformation'
import DoctorListTable from './components/DoctorListTable'
import DoctorVariants from './components/DoctorVariants'
import { useDoctor } from './hooks/useDoctor'

const DoctorMain = () => {
  const {
    doctors,
    doctorsLoading,
    specialtyOptions,
    isSubmitting,
    formHook,
    modalHook,
    openCreateForm,
    openEditForm,
    closeForm,
    handleDelete,
  } = useDoctor()

  const renderLoading = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
      <CircularProgress size={32} />
    </Box>
  )

  const renderEmpty = () => (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No hay doctores registrados
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Comienza creando tu primer doctor
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openCreateForm}
      >
        Crear Primer Doctor
      </Button>
    </Box>
  )

  const renderContent = () => {
    if (doctorsLoading) return renderLoading()
    if (!Array.isArray(doctors) || doctors.length === 0) return renderEmpty()

    if (modalHook.viewMode === 'cards') {
      return (
        <Grid container spacing={3}>
          {doctors?.map((doctor: any) => {
            if (!doctor || !doctor.id) {
              console.error('Invalid doctor object in map:', doctor)
              return null
            }
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={doctor.id}>
                <DoctorCard
                  item={doctor}
                  onView={modalHook.handleViewDoctor}
                  onEdit={openEditForm}
                  onDelete={modalHook.handleDeleteRequest}
                />
              </Grid>
            )
          })}
        </Grid>
      )
    }

    return (
      <DoctorListTable
        doctorData={doctors}
        onEdit={openEditForm}
        onDelete={modalHook.handleDeleteRequest}
        onAdd={openCreateForm}
        onView={modalHook.handleViewDoctor}
      />
    )
  }

  const renderListSection = () => (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant={modalHook.viewMode === 'cards' ? 'contained' : 'outlined'}
            onClick={() => modalHook.setViewMode('cards')}
            size="small"
          >
            Vista de Tarjetas
          </Button>
          <Button
            variant={modalHook.viewMode === 'table' ? 'contained' : 'outlined'}
            onClick={() => modalHook.setViewMode('table')}
            size="small"
          >
            Vista de Tabla
          </Button>
        </Box>
      </Box>

      {renderContent()}
    </>
  )

  const renderFormSection = () => {
    const summary = formHook.getSummary

    return (
      <>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              {formHook.formMode === 'create'
                ? 'Agregar nuevo doctor'
                : 'Editar doctor'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formHook.formMode === 'create'
                ? 'Completa la información personal y profesional para registrar al doctor.'
                : 'Actualiza los datos del doctor seleccionado y confirma los cambios antes de guardar.'}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button
              variant="outlined"
              color="secondary"
              onClick={closeForm}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={formHook.handleSubmitForm}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Guardando...'
                : formHook.formMode === 'create'
                  ? 'Crear doctor'
                  : 'Actualizar doctor'}
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Stack spacing={3}>
              <DoctorInformation
                formData={formHook.formData}
                onFormChange={formHook.handleFormChange}
                errors={formHook.formErrors}
              />
              <DoctorVariants
                formData={formHook.formData}
                onFormChange={formHook.handleFormChange}
                errors={formHook.formErrors}
                specialties={specialtyOptions}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Resumen rápido
                  </Typography>
                  <Stack spacing={2} sx={{ mt: 1 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Nombre completo
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {summary.fullName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Licencia médica
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {summary.license}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Correo electrónico
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {summary.email}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Especialidades
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {summary.specialties}
                      </Typography>
                    </Box>
                  </Stack>
                  <Divider sx={{ my: 3 }} />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={formHook.handleResetForm}
                    fullWidth
                  >
                    {formHook.formMode === 'create'
                      ? 'Limpiar campos'
                      : 'Restablecer cambios'}
                  </Button>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Checklist antes de guardar
                  </Typography>
                  <Stack spacing={1.5}>
                    <Typography variant="body2" color="text.secondary">
                      • Verifica que el correo electrónico sea correcto y esté
                      disponible.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Confirma que la licencia médica esté vigente y sea
                      válida.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Selecciona al menos una especialidad para asegurar la
                      asignación correcta.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Agrega un resumen profesional que dé contexto a la
                      experiencia del doctor.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </>
    )
  }

  if (modalHook.detailDoctor) {
    return (
      <Box sx={{ p: 3 }}>
        <DoctorDetailsProfile
          doctor={modalHook.detailDoctor}
          onBack={modalHook.handleDetailClose}
          onEdit={(doctor) => {
            modalHook.handleDetailClose()
            openEditForm(doctor)
          }}
        />
      </Box>
    )
  }

  if (modalHook.formOpen) {
    return <Box sx={{ p: 3 }}>{renderFormSection()}</Box>
  }

  return (
    <Box sx={{ p: 3 }}>
      {renderListSection()}

      <ConfirmDialog
        open={modalHook.confirmOpen}
        title="¿Eliminar doctor?"
        message={`¿Estás seguro de eliminar al doctor "${modalHook.actionDoctor?.profile?.name ?? ''} ${modalHook.actionDoctor?.profile?.lastName ?? ''}"?`}
        onConfirm={handleDelete}
        onCancel={modalHook.handleCancelDelete}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </Box>
  )
}

export default DoctorMain
