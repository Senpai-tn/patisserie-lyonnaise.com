import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, Stack } from '@mui/material'

export default function ListCategories({
  rows,
  onEdit,
  onDelete,
  rowSelectionModel,
  setRowSelectionModel,
}) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name',
      headerName: 'Nom',
      width: 400,
    },
    { field: 'deletedAt', headerName: 'Supprimé', width: 400 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => {
        return !params.row.deletedAt ? (
          <Stack direction={'row'} spacing={5}>
            <Button color="warning" onClick={() => onEdit(params.row)}>
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
          </Stack>
        ) : (
          <Button
            onClick={() => {
              onDelete(params.row, true)
            }}
          >
            Restorer
          </Button>
        )
      },
    },
  ]
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
