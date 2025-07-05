import { useParams } from 'react-router'

import DoctorView from '../../components/doctors/DoctorView'

const DoctorDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  return <DoctorView id={Number(id)} />
}

export default DoctorDetailPage