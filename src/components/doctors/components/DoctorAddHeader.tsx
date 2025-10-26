// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const DoctorAddHeader = () => {
  return (
    <div className="flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6">
      <div>
        <Typography variant="h4" className="mbe-1">
          Agregar a nuevo Doctor
        </Typography>
        <Typography>Doctores nuevos en el sistema</Typography>
      </div>
      <div className="flex flex-wrap max-sm:flex-col gap-4">
        <Button variant="outlined" color="secondary">
          Descartar
        </Button>
        <Button variant="outlined">Guardar</Button>
        <Button variant="contained">Publicar</Button>
      </div>
    </div>
  )
}

export default DoctorAddHeader
