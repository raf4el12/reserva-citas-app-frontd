import {useParams} from 'react-router'

import AppointmentView from '../../components/appointments/AppointmentsView'

const AppointmentDetailPage = () => {
    const { id } = useParams<{id: string}>()

    return <AppointmentView id = {Number(id)} />
}

export default AppointmentDetailPage