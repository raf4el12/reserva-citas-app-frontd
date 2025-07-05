import { LinearProgress } from '@mui/material'
import type { FC } from 'react'

import { useGetDoctorsById } from '../../hook/doctors/useDoctorById'
import CardTitle from '../commons/CardTitle'
import TextItem from '../commons/TextItem'

interface DoctorViewProps {
  id: number
}

const DoctorView: FC<DoctorViewProps> = ({ id }) => {
  const { isPending, data } = useGetDoctorsById(id)

  if (isPending) return <LinearProgress />

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <CardTitle
        title={`${data?.profile.name} ${data?.profile.lastName}`}
        to="/admin/doctors"
      />
      <TextItem text={id} title="ID" />
      <TextItem text={data?.licenseNumber} title="# Licencia" />
      <TextItem text={data?.resume || 'No adjunto resumen'} title="Resumen" />
    </div>
  )
}

export default DoctorView