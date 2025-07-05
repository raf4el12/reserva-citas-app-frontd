import { useParams } from 'react-router'

import PatientView from '../../components/patients/PatientsView'

const PatientDetailPage = () => {
    const { id } = useParams<{id: string }>()

    return <PatientView id = {Number(id)} /> 
}

export default PatientDetailPage
