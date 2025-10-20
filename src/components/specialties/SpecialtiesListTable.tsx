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

import tableStyles from '../../styles/table.module.css'
import type { Specialties } from '../../types/specialties/specialties'
import DebouncedInput from '../commons/DebouncedInput'

const columnHelper = createColumnHelper<Specialties>()

const simpleFilter = (row: any, columnId: string, value: string) => {
  const cellValue = row.getValue(columnId)
  return String(cellValue ?? '')
    .toLowerCase()
    .includes(value.toLowerCase())
}

interface SpecialtiesListTableProps {
  specialtyData?: Specialties[]
  onEdit?: (specialty: Specialties) => void
  onDelete?: (specialty: Specialties) => void
  onAdd?: () => void
}

const SpecialtiesListTable = ({
  specialtyData,
  onEdit,
  onDelete,
  onAdd,
}: SpecialtiesListTableProps) => {
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const data = specialtyData ?? []

  const columns: ColumnDef<Specialties, any>[] = [
    {
      id: 'select',
      header: ({ table }: { table: any }) => (
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }: { row: any }) => (
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
    columnHelper.accessor('name', {
      header: 'Nombre',
      cell: ({ row }) => (
        <Typography color="text.primary" className="font-medium">
          {row.original.name}
        </Typography>
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Categoría',
      cell: ({ row }) => (
        <Typography variant="body2" color="text.secondary">
          {row.original.category?.name || 'Sin categoría'}
        </Typography>
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Descripción',
      cell: ({ row }) => (
        <Typography variant="body2" color="text.secondary">
          {row.original.description || 'Sin descripción'}
        </Typography>
      ),
    }),
    {
      id: 'status',
      header: 'Estado',
      cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            label={row.original.isActive ? 'Activa' : 'Inactiva'}
            variant="filled"
            color={row.original.isActive ? 'success' : 'default'}
            size="small"
          />
          {row.original.deleted && (
            <Chip label="Eliminada" color="error" size="small" />
          )}
        </Box>
      ),
    },
    {
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
    },
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
      {/* <CardHeader title="Filtros" className="pbe-4" /> */}
      <Divider />
      <div className="flex justify-between flex-col items-start sm:flex-row sm:items-center gap-y-4 p-5">
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value: string | number) => setGlobalFilter(String(value))}
          placeholder="Buscar especialidad..."
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
            Agregar Especialidad
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

export default SpecialtiesListTable
