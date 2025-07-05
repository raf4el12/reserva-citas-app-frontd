import type { FC } from 'react'

import type { Patients } from '../../types/patients'
import CardItem from '../commons/CardItem'

interface PatientsCardDrops {
    item: Patients
}

const PatientsCard: FC<PatientsCardDrops> = ({ item }) => {
    return (
        <CardItem
            href={`/admin/patients/${item.id}/detail`}
            textMain={`${item.profile.name} ${item.profile.lastName}`}
            textSecondary={item.id.toString()}
        />

    )
}

export default PatientsCard