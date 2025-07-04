import CloseIcon from '@mui/icons-material/Close'
import { IconButton, LinearProgress } from '@mui/material'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import { useGetDoctorsById } from '../../hook/doctors/useDoctorById'

const DoctorDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { isPending, data } = useGetDoctorsById(Number(id))

  if (isPending) return <LinearProgress />

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="flex gap-2 justify-between">
        <h2 className="text-3xl font-bold text-primary mb-2">
          Detalle de Doctor
        </h2>
        <IconButton size="small">
          <Link to="/admin/doctors">
            <CloseIcon />
          </Link>
        </IconButton>
      </div>
      <div className="mb-4">
        <span className="block text-gray-500 text-sm mb-1">Nombre</span>
        <span className="text-lg font-semibold">{data?.profileId}</span>
      </div>
      <div>
        <span className="block text-gray-500 text-sm mb-1">ID</span>
        <span className="text-base">{id}</span>
      </div>
    </div>
  )
}

export default DoctorDetailPage
