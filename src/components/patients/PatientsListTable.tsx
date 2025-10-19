import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Typography,
  Box,
  Card,
  TextField,
  InputAdornment,
  Button,
  TablePagination,
} from '@mui/material'
import { Edit, Delete, Visibility, Add, Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { Patients } from '../../types/patients'

interface PatientsListTableProps {
  patients: Patients[]
  onDelete: (id: number) => void
  onAdd?: () => void
  loading?: boolean
  pagination?: {
    totalRows: number
    totalPages: number
    currentPage: number
    pageSize: number
  }
  onPageChange?: (page: number, pageSize: number) => void
}

const PatientsListTable = ({ 
  patients, 
  onDelete, 
  onAdd,
  loading = false,
  pagination,
  onPageChange 
}: PatientsListTableProps) => {
  const navigate = useNavigate()
  const [globalFilter, setGlobalFilter] = useState('')

  const handleEdit = (id: number) => {
    navigate(`/admin/patients/update/${id}`)
  }

  const handleView = (id: number) => {
    navigate(`/admin/patients/detail/${id}`)
  }

  const handleAddPatient = () => {
    if (onAdd) {
      onAdd()
    } else {
      navigate('/admin/patients/new')
    }
  }

  // Filtrar pacientes según el filtro global
  const filteredPatients = patients.filter(patient => {
    if (!globalFilter) return true
    const searchText = globalFilter.toLowerCase()
    return (
      patient.profile.name.toLowerCase().includes(searchText) ||
      patient.profile.lastName.toLowerCase().includes(searchText) ||
      patient.bloodType?.toLowerCase().includes(searchText) ||
      patient.emergencyContact?.toLowerCase().includes(searchText) ||
      patient.allergies?.toLowerCase().includes(searchText)
    )
  })

  const handlePageChange = (_event: unknown, newPage: number) => {
    if (onPageChange && pagination) {
      onPageChange(newPage + 1, pagination.pageSize)
    }
  }

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = Number.parseInt(event.target.value, 10)
    if (onPageChange && pagination) {
      onPageChange(1, newPageSize)
    }
  }

  return (
    <Card>
      {/* HEADER CON TÍTULO, BOTÓN ADD Y SEARCH */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '24px' }}>
        <div>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: '4px' }}>
            Pacientes
          </Typography>
          <Typography variant='body2' color="text.secondary">
            Gestiona la información de los pacientes
          </Typography>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Buscador */}
          <TextField
            size="small"
            placeholder="Buscar paciente..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              )
            }}
            sx={{ minWidth: 250 }}
          />
          
          {/* Botón Add */}
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddPatient}
            sx={{ 
              minWidth: 'auto',
              px: 3
            }}
          >
            Nuevo Paciente
          </Button>
        </div>
      </div>

      {/* TABLA */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="patients table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nombre Completo</strong></TableCell>
              <TableCell><strong>Tipo de Sangre</strong></TableCell>
              <TableCell><strong>Contacto Emergencia</strong></TableCell>
              <TableCell><strong>Alergias</strong></TableCell>
              <TableCell><strong>Condiciones Crónicas</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              // Skeleton loader simple
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 7 }).map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Box 
                        sx={{ 
                          height: 20, 
                          backgroundColor: 'grey.200', 
                          borderRadius: 1,
                          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                        }} 
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                    {globalFilter ? 'No se encontraron pacientes que coincidan con la búsqueda' : 'No hay pacientes registrados'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient) => (
                <TableRow
                  key={patient.id}
                  sx={{ 
                    '&:hover': { backgroundColor: '#f9f9f9' },
                    '&:nth-of-type(odd)': { backgroundColor: '#fafafa' }
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      #{patient.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium" color="text.primary">
                        {patient.profile.name} {patient.profile.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {patient.profile.id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={patient.bloodType || 'No especificado'}
                      size="small"
                      variant="outlined"
                      color={patient.bloodType ? 'primary' : 'default'}
                      sx={{ minWidth: 80 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {patient.emergencyContact || 'No registrado'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color={patient.allergies ? 'text.primary' : 'text.secondary'}>
                      {patient.allergies || 'Ninguna'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color={patient.chronic_conditions ? 'text.primary' : 'text.secondary'}>
                      {patient.chronic_conditions || 'Ninguna'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" gap={0.5} justifyContent="center">
                      <IconButton
                        size="small"
                        onClick={() => handleView(patient.id)}
                        color="info"
                        title="Ver detalles"
                        sx={{ 
                          '&:hover': { backgroundColor: 'info.lighter' }
                        }}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(patient.id)}
                        color="primary"
                        title="Editar"
                        sx={{ 
                          '&:hover': { backgroundColor: 'primary.lighter' }
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => onDelete(patient.id)}
                        color="error"
                        title="Eliminar"
                        sx={{ 
                          '&:hover': { backgroundColor: 'error.lighter' }
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* PAGINACIÓN */}
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component='div'
          count={pagination.totalRows}
          rowsPerPage={pagination.pageSize}
          page={pagination.currentPage - 1}
          SelectProps={{
            inputProps: { 'aria-label': 'filas por página' }
          }}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
          }
        />
      )}
    </Card>
  )
}

export default PatientsListTable