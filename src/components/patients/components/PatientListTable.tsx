import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  TablePagination,
  Typography,
} from '@mui/material'
import {
  type ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import classnames from 'classnames'
import { useState } from 'react'

import tableStyles from '../../../styles/table.module.css'
import type { Patient } from '../../../types/patients/patientSchema'
import DebouncedInput from '../../commons/DebouncedInput'

const columnHelper = createColumnHelper<Patient>()

const simpleFilter = (row: any, columnId: string, value: string) => {
  const cellValue = row.getValue(columnId)
  return String(cellValue ?? '')
    .toLowerCase()
    .includes(value.toLowerCase())
}

interface PatientListTableProps {
  patientData?: Patient[]
  onEdit?: (patient: Patient) => void
  onDelete?: (patient: Patient) => void
  onAdd?: () => void
  onView?: (patient: Patient) => void
}

const PatientListTable = ({
  patientData,
  onEdit,
  onDelete,
  onAdd,
  onView,
}: PatientListTableProps) => {
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const data = patientData ?? []

  const columns: ColumnDef<Patient, any>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    },
    columnHelper.accessor('id', {
      header: 'ID',
      cell: ({ row }) => (
        <Typography color="text.primary" className="font-medium">
          {row.original.id}
        </Typography>
      ),
    }),
    columnHelper.display({
      id: 'profile',
      header: 'Perfil',
      cell: ({ row }) => {
        const profile = row.original.profile
        const fullName = [profile?.name, profile?.lastName]
          .filter(Boolean)
          .join(' ')

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography color="text.primary" className="font-medium">
              {fullName || 'Sin nombre'}
            </Typography>
            <IconButton
              size="small"
              onClick={() => onView?.(row.original)}
              title="Ver perfil completo"
              sx={{ color: '#5271FF' }}
            >
              <i className="ri-eye-line" style={{ fontSize: '18px' }} />
            </IconButton>
          </Box>
        )
      },
    }),
    columnHelper.accessor('bloodType', {
      header: 'Tipo de sangre',
      cell: ({ row }) => (
        <Chip
          label={row.original.bloodType}
          color="primary"
          size="small"
          variant="outlined"
        />
      ),
    }),
    columnHelper.accessor('emergencyContact', {
      header: 'Contacto de emergencia',
      cell: ({ row }) => (
        <Typography color="text.primary" className="font-medium">
          {row.original.emergencyContact || 'No registrado'}
        </Typography>
      ),
    }),
    columnHelper.display({
      id: 'allergies',
      header: 'Alergias',
      cell: ({ row }) => (
        <Typography
          variant="body2"
          color={row.original.allergies ? 'text.primary' : 'text.secondary'}
          sx={{ maxWidth: 200 }}
        >
          {row.original.allergies || 'Ninguna'}
        </Typography>
      ),
    }),
    columnHelper.display({
      id: 'chronicConditions',
      header: 'Condiciones crónicas',
      cell: ({ row }) => (
        <Typography
          variant="body2"
          color={
            row.original.chronic_conditions ? 'text.primary' : 'text.secondary'
          }
          sx={{ maxWidth: 200 }}
        >
          {row.original.chronic_conditions || 'Ninguna'}
        </Typography>
      ),
    }),
    columnHelper.display({
      id: 'status',
      header: 'Estado',
      cell: ({ row }) => (
        <Chip
          label={row.original.deleted ? 'Eliminado' : 'Activo'}
          variant="filled"
          color={row.original.deleted ? 'error' : 'success'}
          size="small"
        />
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <IconButton
            size="medium"
            onClick={() => onEdit?.(row.original)}
            title="Editar"
          >
            <i
              className="ri-edit-box-line"
              style={{ fontSize: '24px', color: '#5271FF' }}
            />
          </IconButton>
          <IconButton
            size="medium"
            onClick={() => onDelete?.(row.original)}
            title="Eliminar"
          >
            <i
              className="ri-delete-bin-6-line"
              style={{ fontSize: '24px', color: '#FF3535' }}
            />
          </IconButton>
        </div>
      ),
      enableSorting: false,
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      simple: simpleFilter,
    },
    state: {
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    enableRowSelection: true,
    globalFilterFn: simpleFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  })

  return (
    <Card>
      <Divider />
      <div className="flex justify-between flex-col items-start sm:flex-row sm:items-center gap-y-4 p-5">
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value: string | number) => setGlobalFilter(String(value))}
          placeholder="Buscar paciente..."
          className="max-sm:is-full"
        />
        <div className="flex items-center max-sm:flex-col gap-4 max-sm:is-full is-auto">
          <Button
            variant="contained"
            onClick={onAdd}
            startIcon={<i className="ri-add-line" />}
            className="max-sm:is-full is-auto"
            disabled={!onAdd}
          >
            Agregar Paciente
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none':
                            header.column.getCanSort(),
                          'bg-transparent border-none p-0': true,
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                        disabled={!header.column.getCanSort()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <i className="ri-arrow-up-s-line text-xl" />,
                          desc: <i className="ri-arrow-down-s-line text-xl" />,
                        }[header.column.getIsSorted() as 'asc' | 'desc'] ??
                          null}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan={table.getVisibleFlatColumns().length}
                  className="text-center"
                >
                  No hay datos disponibles
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map((row: any) => (
                  <tr
                    key={row.id}
                    className={classnames({ selected: row.getIsSelected() })}
                  >
                    {row.getVisibleCells().map((cell: any) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        className="border-bs"
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={(event) =>
          table.setPageSize(Number(event.target.value))
        }
      />
    </Card>
  )
}

export default PatientListTable
