import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, TextField } from '@mui/material'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

import {
  type Category,
  type CategoryDto,
  categoryDtoSchema,
} from '../../types/category'
import ButtonActionItem from '../commons/ButtonActionItem'
import CardTitle from '../commons/CardTitle'
import ContentItem from '../commons/ContentItem'

interface CategoryUpsertProps {
  loading?: boolean
  onSuccess?: (data: CategoryDto) => void
  rootError?: string
  category?: Category | null
}

const CategoryUpsert: FC<CategoryUpsertProps> = ({
  category,
  loading,
  rootError,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CategoryDto>({
    resolver: zodResolver(categoryDtoSchema),
    defaultValues: {
      ...(category ? category : {}),
    },
  })

  const onSubmit = async (data: CategoryDto) => {
    onSuccess?.(data)
  }

  return (
    <ContentItem>
      <CardTitle
        title={watch('name')}
        to="/admin/categories"
        placeholder="Nueva categoría..."
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <TextField
            autoFocus
            label="Nombre"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            size="small"
          />
        </div>
        {rootError && (
          <Alert severity="error" className="mt-2">
            {rootError}
          </Alert>
        )}
        <ButtonActionItem
          to="/admin/categories"
          disabled={isSubmitting || loading}
        />
      </form>
    </ContentItem>
  )
}

export default CategoryUpsert
