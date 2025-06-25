import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import type { FC } from 'react'
import type { Profile } from '../../types/profile'
import ItemContainer from '../commons/ItemContainer'

interface ProfileCardProps {
  item: Profile
  onDelete: (id: number) => void
  onUpdate: (id: number, name: string, email: string) => void
  detailUrl: (item: Profile) => string
}

const ProfileCard: FC<ProfileCardProps> = ({ item, onDelete, onUpdate, detailUrl }) => {
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <ItemContainer>
          <PersonIcon fontSize="small" />
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {item.name}
          </Typography>
        </ItemContainer>
        <ItemContainer>
          <EmailIcon fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {item.email}
          </Typography>
        </ItemContainer>
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onUpdate(item.id, item.name, item.email)}
          >
            Editar
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => onDelete(item.id)}
          >
            Eliminar
          </Button>
          <Button
            size="small"
            variant="outlined"
            href={detailUrl(item)}
          >
            Detalle
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProfileCard