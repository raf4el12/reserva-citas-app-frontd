import type { FC } from 'react'

import type { Doctor } from '../../types/doctor'
import CardItem from '../commons/CardItem'

interface DoctorCardProps {
  item: Doctor
}

const DoctorCard: FC<DoctorCardProps> = ({ item }) => {
  return (
    <CardItem
      toDetail={`/admin/doctors/${item.id}/detail`}
      textMain={`${item.profile.name} ${item.profile.lastName}`}
      textSecondary={item.id.toString()}
    />
  )
}

export default DoctorCard
