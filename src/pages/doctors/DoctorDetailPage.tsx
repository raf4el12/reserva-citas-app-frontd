import { useParams } from 'react-router'

import DoctorView from '../../components/doctors/DoctorView'

const DoctorDetailPage = () => {
  const { id } = useParams<{ id: string }>() // Usamos useParams para obtener el ID de la URL

  return <DoctorView id={Number(id)} /> // Convertimos id a número antes de pasarlo como prop
}

export default DoctorDetailPage
