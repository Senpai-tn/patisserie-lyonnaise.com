import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Stack } from '@mui/material'

export default function ListProducts({
  rows,
  onEdit,
  onDelete,
  rowSelectionModel,
  setRowSelectionModel,
}) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'image',
      headerName: 'Image',
      width: 70,
      renderCell: (params) => {
        return (
          <img
            style={{ borderRadius: '50%' }}
            height={'57px'}
            width={'57px'}
            src={params.row.image}
          />
        )
      },
    },
    {
      field: 'name',
      headerName: 'Nom',
    },
    {
      field: 'category',
      headerName: 'Catégorie',

      renderCell: (params) => {
        return params.row.category !== undefined && params.row.category !== null
          ? params.row.category.name
          : ''
      },
    },
    { field: 'price', headerName: 'Prix' },
    { field: 'deletedAt', headerName: 'Supprimé' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => {
        return (
          <Stack direction={'row'} spacing={5}>
            {!params.row.deletedAt ? (
              <>
                <Button
                  color="warning"
                  onClick={() => {
                    onEdit(params.row)
                  }}
                >
                  Modifier
                </Button>
                <Button
                  color="error"
                  onClick={() => {
                    onDelete(params.row)
                  }}
                >
                  Supprimer
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  onDelete(params.row, true)
                }}
              >
                Restorer
              </Button>
            )}
          </Stack>
        )
      },
    },
  ]

  React.useEffect(() => {
    console.log('rows => ', rows)
  }, [rows])

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => row.id}
      initialState={{
        columns: { columnVisibilityModel: { id: false } },
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel)
        console.log(newRowSelectionModel)
      }}
      rowSelectionModel={rowSelectionModel}
      pageSizeOptions={[10, 20, 100]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  )
}
