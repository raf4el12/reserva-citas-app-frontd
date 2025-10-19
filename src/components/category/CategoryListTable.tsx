import { useState } from 'react'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  useReactTable,
  createColumnHelper
} from '@tanstack/react-table'
import classnames from 'classnames'

// Components
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'

// Custom Components
import DebouncedInput from '../commons/DebouncedInput'

// Types
import type { Category } from '../../types/category'

// Styles
import tableStyles from '../../styles/table.module.css'

// Column helper
const columnHelper = createColumnHelper<Category>()

// Simple filter function
const simpleFilter = (row: any, columnId: string, value: string) => {
  const cellValue = row.getValue(columnId)
  return String(cellValue).toLowerCase().includes(value.toLowerCase())
}

interface CategoryListTableProps {
  categoryData?: Category[]
  onEdit?: (category: Category) => void
  onDelete?: (category: Category) => void
  onAdd?: () => void
}

const CategoryListTable = ({ categoryData, onEdit, onDelete, onAdd }: CategoryListTableProps) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const data = categoryData ?? []

  const columns: ColumnDef<Category, any>[] = [
      {
        id: 'select',
        header: ({ table }: { table: any }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }: { row: any }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('id', {
        header: 'ID',
        cell: ({ row }: { row: any }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.id}
          </Typography>
        )
      }),
      columnHelper.accessor('name', {
        header: 'Nombre',
        cell: ({ row }: { row: any }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.name}
          </Typography>
        )
      }),
      columnHelper.accessor('description', {
        header: 'Descripción',
        cell: ({ row }: { row: any }) => (
          <Typography variant='body2' color='text.secondary'>
            {row.original.description || 'Sin descripción'}
          </Typography>
        )
      }),
     {
        id: 'status',
        header: 'Estado',
        cell: ({ row }: { row: any }) => (
          <Chip
            label={row.original.isActive ? 'Activa' : 'Inactivo'}
            variant='filled'
            color={row.original.isActive ? 'success' : 'default'}
            size='small'
          />
        )
      },
      columnHelper.accessor('createdAt', {
        header: 'Fecha Creación',
        cell: ({ row }: { row: any }) => (
          <Typography variant='body2'>
            {new Date(row.original.createdAt).toLocaleDateString('es-ES')}
          </Typography>
        )
      }),
      columnHelper.accessor('updatedAt', {
        header: 'Última Actualización',
        cell: ({ row }: { row: any }) => (
          <Typography variant='body2'>
            {row.original.updatedAt 
              ? new Date(row.original.updatedAt).toLocaleDateString('es-ES')
              : 'Nunca'
            }
          </Typography>
        )
      }),
      {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }: { row: any }) => (
          <div className='flex items-center gap-1'>
            <IconButton 
              size='medium'
              onClick={() => onEdit?.(row.original)}
              title="Editar"
            >
              <i
                className='ri-edit-box-line'
                style={{ fontSize: '24px', color: '#5271FF' }}
              />
            </IconButton>
            <IconButton 
              size='medium'
              onClick={() => onDelete?.(row.original)}
              title="Eliminar"
            >
              <i
                className='ri-delete-bin-6-line'
                style={{ fontSize: '24px', color: '#FF3535' }}
              />
            </IconButton>
          </div>
        ),
        enableSorting: false
      }
    ]

  const table = useReactTable({
  data,
    columns,
    filterFns: {
      simple: simpleFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
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
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <Card>
        <CardHeader title='Filtros' className='pbe-4' />
        {/* Aquí puedes agregar filtros específicos si los necesitas */}
        <Divider />
        <div className='flex justify-between flex-col items-start sm:flex-row sm:items-center gap-y-4 p-5'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value: string | number) => setGlobalFilter(String(value))}
            placeholder='Buscar categoría...'
            className='max-sm:is-full'
          />
          <div className='flex items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
            <Button
              variant='contained'
              onClick={onAdd}
              startIcon={<i className='ri-add-line' />}
              className='max-sm:is-full is-auto'
              disabled={!onAdd}
            >
              Agregar Categoría
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map((headerGroup: any) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header: any) => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <button
                            type="button"
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort(),
                              'bg-transparent border-none p-0': true
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                            disabled={!header.column.getCanSort()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='ri-arrow-up-s-line text-xl' />,
                              desc: <i className='ri-arrow-down-s-line text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </button>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No hay datos disponibles
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map((row: any) => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map((cell: any) => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component='div'
          className='border-bs'
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
          onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        />
      </Card>
    </>
  )
}

export default CategoryListTable
