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
import PatientCard from './components/PatientCard'
import PatientDetailsProfile from './components/PatientDetailsProfile'
import PatientInformation from './components/PatientInformation'
import PatientListTable from './components/PatientListTable'
import PatientMedicalInfo from './components/PatientMedicalInfo'
import { usePatient } from './hooks/usePatient'

const PatientMain = () => {
  const {
    patients,
    patientsLoading,
    isSubmitting,
    formHook,
    modalHook,
    openCreateForm,
    openEditForm,
    closeForm,
    handleDelete,
  } = usePatient()

  const renderLoading = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
      <CircularProgress size={32} />
    </Box>
  )

  const renderEmpty = () => (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No hay pacientes registrados
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Comienza creando tu primer paciente
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openCreateForm}
      >
        Crear Primer Paciente
      </Button>
    </Box>
  )

  const renderContent = () => {
    if (patientsLoading) return renderLoading()
    if (!Array.isArray(patients) || patients.length === 0) return renderEmpty()

    if (modalHook.viewMode === 'cards') {
      return (
        <Grid container spacing={3}>
          {patients?.map((patient: any) => {
            if (!patient || !patient.id) {
              console.error('Invalid patient object in map:', patient)
              return null
            }
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={patient.id}>
                <PatientCard
                  item={patient}
                  onView={modalHook.handleViewPatient}
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
      <PatientListTable
        patientData={patients}
        onEdit={openEditForm}
        onDelete={modalHook.handleDeleteRequest}
        onAdd={openCreateForm}
        onView={modalHook.handleViewPatient}
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
                ? 'Agregar nuevo paciente'
                : 'Editar paciente'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formHook.formMode === 'create'
                ? 'Completa la información personal y médica para registrar al paciente.'
                : 'Actualiza los datos del paciente seleccionado y confirma los cambios antes de guardar.'}
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
                  ? 'Crear paciente'
                  : 'Actualizar paciente'}
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Stack spacing={3}>
              <PatientInformation
                formData={formHook.formData}
                onFormChange={formHook.handleFormChange}
                errors={formHook.formErrors}
              />
              <PatientMedicalInfo
                formData={formHook.formData}
                onFormChange={formHook.handleFormChange}
                errors={formHook.formErrors}
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
                        Correo electrónico
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {summary.email}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Contacto de emergencia
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {summary.emergencyContact}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Tipo de sangre
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {summary.bloodType}
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
                      • Confirma que el contacto de emergencia sea válido y esté
                      disponible.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Especifica el tipo de sangre correcto para emergencias
                      médicas.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • Registra alergias y condiciones crónicas importantes
                      para el cuidado médico.
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

  if (modalHook.detailPatient) {
    return (
      <Box sx={{ p: 3 }}>
        <PatientDetailsProfile
          patient={modalHook.detailPatient}
          onBack={modalHook.handleDetailClose}
          onEdit={(patient) => {
            modalHook.handleDetailClose()
            openEditForm(patient)
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
        title="¿Eliminar paciente?"
        message={`¿Estás seguro de eliminar al paciente "${modalHook.actionPatient?.profile?.name ?? ''} ${modalHook.actionPatient?.profile?.lastName ?? ''}"?`}
        onConfirm={handleDelete}
        onCancel={modalHook.handleCancelDelete}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </Box>
  )
}

export default PatientMain
