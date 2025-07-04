import type { FC } from 'react'

import type { Doctor } from '../../types/doctor'
import CardItem from '../commons/CardItem'

interface DoctorCardProps {
  item: Doctor
}

const DoctorCard: FC<DoctorCardProps> = ({ item }) => {
  return (
    <CardItem
      href={`/admin/doctors/${item.id}/detail`}
      textMain={item.profileId.toString()}
      textSecondary={item.id.toString()}
    />
  )
}

export default DoctorCard
