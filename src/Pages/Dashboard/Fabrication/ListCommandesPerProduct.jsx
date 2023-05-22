import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Controller, useForm } from 'react-hook-form'
import dayjs from 'dayjs'

const ListCommandesPerProduct = ({ commandeList }) => {
  const { control, watch, setValue } = useForm({
    defaultValues: { date: dayjs() },
  })
  const [nbCommandeProduct, setNbCommandeProduct] = useState({})
  React.useEffect(() => {
    var nbCommande = {}
    commandeList.map((c) => {
      return (
        dayjs.unix(parseInt(c.date)).format('DD-MM-YYYY') ===
          dayjs(watch('date')).format('DD-MM-YYYY') &&
        c.list.map((item) => {
          return nbCommande[item.name]
            ? (nbCommande[item.name] += item.itemsToSold)
            : (nbCommande[item.name] = item.itemsToSold)
        })
      )
    })

    setNbCommandeProduct(nbCommande)
  }, [watch('date'), commandeList])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: '100%' }}>
        <Paper
          sx={{
            width: '100%',
            mb: 2,
            alignItems: 'center',
            fontFamily: 'sans-serif',
          }}
        >
          <Stack justifyContent={'center'} alignItems={'center'} pt={'30px'}>
            <Stack direction={'row'}>
              <IconButton
                onClick={() => {
                  setValue('date', dayjs(watch('date')).add(-1, 'day'))
                }}
              >
                -
              </IconButton>
              <Controller
                control={control}
                name="date"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <DatePicker
                      value={value}
                      onChange={onChange}
                      label="Basic date picker"
                      format="DD-MM-YYYY"
                    />
                  )
                }}
              />
              <IconButton
                onClick={() => {
                  setValue('date', dayjs(watch('date')).add(1, 'day'))
                }}
              >
                +
              </IconButton>
            </Stack>
            <TableContainer sx={{ width: '70%', align: 'center' }}>
              <Table aria-labelledby="tableTitle" size={'medium'}>
                <TableHead sx={{ bgcolor: '#b8b2b2' }}>
                  <TableCell sx={{ borderRadius: '30px 0 0 0' }}>
                    Produit
                  </TableCell>
                  <TableCell sx={{ borderRadius: '0 30px 0 0' }}>
                    Quantité journalière
                  </TableCell>
                </TableHead>
                <TableBody>
                  {Object.entries(nbCommandeProduct).map((item, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell> {item[0]}</TableCell>
                        <TableCell> {item[1]}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Paper>
      </Box>
    </LocalizationProvider>
  )
}

export default ListCommandesPerProduct
