import { Alert, LinearProgress } from '@mui/material'
import type { FC } from 'react'
import { useGetDoctorsById } from '../../hook/doctors/useDoctorById'
import { useGetDoctorSpecialtiesById } from '../../hook/doctors/useDoctorSpecialtiesById'
import CardTitle from '../commons/CardTitle'
import TextItem from '../commons/TextItem'

interface DoctorViewProps {
  id: number
}

const DoctorView: FC<DoctorViewProps> = ({ id }) => {
  const { isPending, data } = useGetDoctorsById(id)
  const {
    isLoading: isLoadingSpecialties,
    data: specialties,
    isError: isSpecialtiesError,
  } = useGetDoctorSpecialtiesById(id)

  if (isPending || isLoadingSpecialties) return <LinearProgress />

  if (isSpecialtiesError) {
    return (
      <Alert severity="error">
        Error al cargar las especialidades del doctor.
      </Alert>
    )
  }

  const specialtiesNames =
    specialties
      ?.map((specialty) => specialty?.specialty?.name)
      .filter((name) => name !== undefined)
      .join(', ') || 'No tiene especialidades asignadas'

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <CardTitle
        title={`${data?.profile.name} ${data?.profile.lastName}`}
        to="/admin/doctors"
      />
      <TextItem text={data?.id} title="ID" />
      <TextItem text={data?.licenseNumber} title="# Licencia" />
      <TextItem text={data?.resume || 'No adjunto resumen'} title="Resumen" />
      <TextItem text={specialtiesNames} title="Especialidades" />
    </div>
  )
}

export default DoctorView
