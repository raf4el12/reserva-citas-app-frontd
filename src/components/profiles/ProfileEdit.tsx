import { TextField } from '@mui/material'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { ProfileCreateDto } from '../../types/profile'

type ProfileEditProps = {
  register: UseFormRegister<ProfileCreateDto & any>
  errors: FieldErrors<ProfileCreateDto>
}

const ProfileEdit = ({ register, errors }: ProfileEditProps) => {
  return (
    <>
      <TextField
        label="Nombre"
        fullWidth
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        size="small"
      />
      <TextField
        label="Apellido"
        fullWidth
        {...register('lastName')}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        size="small"
      />
      <TextField
        label="Correo electrónico"
        fullWidth
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        size="small"
      />
      <TextField
        label="Teléfono"
        fullWidth
        {...register('phone')}
        error={!!errors.phone}
        helperText={errors.phone?.message}
        size="small"
      />
      <TextField
        label="Dirección"
        fullWidth
        {...register('address')}
        error={!!errors.address}
        helperText={errors.address?.message}
        size="small"
      />
      <TextField
        label="Nacionalidad"
        fullWidth
        {...register('national')}
        error={!!errors.national}
        helperText={errors.national?.message}
        size="small"
      />
      <TextField
        label="Tipo de documento"
        fullWidth
        {...register('typeDocument')}
        error={!!errors.typeDocument}
        helperText={errors.typeDocument?.message}
        size="small"
      />
      <TextField
        label="Número de documento"
        fullWidth
        {...register('numberDocument')}
        error={!!errors.numberDocument}
        helperText={errors.numberDocument?.message}
        size="small"
      />
      <TextField
        label="Fecha de nacimiento"
        type="date"
        fullWidth
        {...register('birthday')}
        error={!!errors.birthday}
        helperText={errors.birthday?.message}
        size="small"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Género"
        fullWidth
        {...register('gender')}
        error={!!errors.gender}
        helperText={errors.gender?.message}
        size="small"
      />
    </>
  )
}

export default ProfileEdit
