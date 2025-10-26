import CloseIcon from '@mui/icons-material/Close'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import Envs from '../../../shared/envs'

interface PhotoPreviewProps {
  photoUrl?: string | File | Blob
  firstName: string
  lastName: string
  onRemove?: () => void
}

const PhotoPreview = ({
  photoUrl,
  firstName,
  lastName,
  onRemove,
}: PhotoPreviewProps) => {
  const [imageError, setImageError] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | undefined>()
  const previousUrlRef = useRef<string | File | Blob>()

  // Convert File/Blob to URL
  useEffect(() => {
    if (photoUrl instanceof File || photoUrl instanceof Blob) {
      const url = URL.createObjectURL(photoUrl)
      setImageUrl(url)
      return () => URL.revokeObjectURL(url)
    }

    // Handle string URLs
    if (typeof photoUrl === 'string' && photoUrl.trim() !== '') {
      // If it's a relative path starting with /uploads/, construct full URL
      if (photoUrl.startsWith('/uploads/')) {
        const fullUrl = `${Envs.VITE_API_BACKEND_URL}${photoUrl}`
        setImageUrl(fullUrl)
      } else {
        setImageUrl(photoUrl)
      }
    } else {
      setImageUrl(undefined)
    }
  }, [photoUrl])

  // Reset error when photoUrl changes
  useEffect(() => {
    if (previousUrlRef.current !== photoUrl) {
      setImageError(false)
      previousUrlRef.current = photoUrl
    }
  })

  const initials = [firstName, lastName]
    .filter(Boolean)
    .map((name) => name?.[0]?.toUpperCase() || '')
    .slice(0, 2)
    .join('')

  // Check if URL is valid for an image
  const isValidImageUrl = (url: string): boolean => {
    const imageExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
      '.svg',
      '.bmp',
    ]
    const urlLower = url.toLowerCase()
    return (
      imageExtensions.some((ext) => urlLower.includes(ext)) ||
      urlLower.includes('data:image') ||
      urlLower.includes('image/') ||
      urlLower.includes('pravatar') ||
      urlLower.includes('randomuser') ||
      urlLower.includes('/uploads/') ||
      urlLower.startsWith('/uploads/')
    )
  }

  // Check if we have a valid image (string URL or blob URL from File)
  const hasPhoto =
    imageUrl &&
    !imageError &&
    (imageUrl.startsWith('blob:') ||
      imageUrl.startsWith('data:image') ||
      (typeof imageUrl === 'string' &&
        imageUrl.trim() !== '' &&
        isValidImageUrl(imageUrl)))

  return (
    <Box
      sx={{
        border: '2px dashed',
        borderColor: 'divider',
        borderRadius: 2,
        p: 3,
        backgroundColor: 'background.paper',
      }}
    >
      <Stack spacing={2} alignItems="center">
        {!hasPhoto &&
          imageUrl &&
          typeof imageUrl === 'string' &&
          imageUrl.trim() !== '' && (
            <Typography variant="body2" color="warning.main" fontWeight={600}>
              ⚠ La URL no parece ser una imagen válida
            </Typography>
          )}
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <Avatar
            src={hasPhoto ? imageUrl : undefined}
            onError={() => setImageError(true)}
            sx={{
              width: 120,
              height: 120,
              bgcolor: 'primary.main',
              fontSize: '3rem',
              fontWeight: 'bold',
            }}
          >
            {!hasPhoto && initials}
          </Avatar>
          {hasPhoto && onRemove && (
            <IconButton
              size="small"
              onClick={onRemove}
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                bgcolor: 'error.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'error.dark',
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        {hasPhoto ? (
          <>
            <Typography variant="body2" color="success.main" fontWeight={600}>
              ✓ Foto cargada
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
            >
              {imageUrl &&
              typeof imageUrl === 'string' &&
              imageUrl.startsWith('data:image')
                ? 'Imagen desde PC'
                : typeof photoUrl === 'string'
                  ? photoUrl
                  : 'Imagen desde PC'}
            </Typography>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Vista previa de la foto
            <br />
            <Typography component="span" variant="caption">
              Agrega una URL de imagen arriba
            </Typography>
          </Typography>
        )}
      </Stack>
    </Box>
  )
}

export default PhotoPreview
