import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import dayjs from 'dayjs'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Button } from '@mui/material'
import { exportToPdf } from '../../../utils/ExportPDF'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
function Row(props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  let somme = 0
  const headers = [
    { id: 'desc', label: 'Description' },
    { id: 'qte', label: 'Quantité' },
    { id: 'pu', label: 'Prix Unitaire HT' },
    { id: 'tva', label: 'TVA' },
    { id: 'total', label: 'Total' },
  ]
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.nameSociete !== 'null' ? row.nameSociete : null}
        </TableCell>
        <TableCell align="left">
          {row.address !== 'null' ? row.address : ''}
        </TableCell>
        <TableCell align="left">
          {row.phone !== 'null' ? row.phone : ''}
        </TableCell>
        <TableCell align="left">
          {row.email !== 'null' ? row.email : ''}
        </TableCell>
        <TableCell align="left">
          {dayjs.unix(row.date).format('HH:mm DD-MM-YYYY')}
        </TableCell>
        <TableCell align="left">
          {row.list.map((item) => {
            item.price &&
              (somme +=
                item.price.replace('€', '').replace(',', '.') *
                item.itemsToSold)
          })}
          {(somme * 1.2).toFixed(2)} €
        </TableCell>
        <TableCell>
          <IconButton
            onClick={() => {
              exportToPdf(
                'Commande',
                {
                  date: dayjs().format('HH:mm DD-MM-YYYY'),
                  num_facture: '',
                  adresse: row.address,
                  cp: '',
                  tel: row.phone,
                  email: row.email,
                },

                headers.map((hd) => ({
                  header: hd.label,
                  dataKey: typeof hd.id === 'object' ? hd.id[0] : hd.id,
                })),
                row.list.map((item) => ({
                  desc: item.name,
                  qte: item.itemsToSold,
                  pu: item.price + ' €',
                  tva: '20%',
                  total:
                    (item.price * item.itemsToSold * 1.2).toFixed(2) + ' €',
                })),
                row.list.map((item) => ({ hidden: '', HT: 'AA', value: 'AA' }))
              )
            }}
          >
            <PictureAsPdfIcon htmlColor="#1976d2" fontSize="large" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: '0' }}
          colSpan={8}
          sx={{ bgcolor: '#bcddff94', textAlign: 'center', mx: '30px' }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ mx: '30px' }}>
              <Typography variant="h6" gutterBottom component="div">
                Liste des Produits Commandés
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Nom Produit</TableCell>
                    <TableCell align="left">Quantité</TableCell>
                    <TableCell align="left">PU HT</TableCell>
                    <TableCell align="left">Prix total HT</TableCell>
                    <TableCell align="left">Prix total TTC</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.list.map((produit) => (
                    <TableRow key={produit.id}>
                      <TableCell>
                        <img src={produit.image} width={'50px'} />
                      </TableCell>
                      <TableCell align="left">{produit.name}</TableCell>

                      <TableCell component="th" scope="row">
                        {produit.itemsToSold}
                      </TableCell>
                      <TableCell align="left">{produit.price}</TableCell>
                      <TableCell align="left">
                        {(
                          produit.price.replace('€', '').replace(',', '.') *
                          produit.itemsToSold
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="left">
                        {(
                          produit.price.replace('€', '').replace(',', '.') *
                          produit.itemsToSold *
                          1.2
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
}

export default function ListCommandes({ rows }) {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('nameSociete')
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [rowsVisible, setRows] = React.useState(rows)
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nom du société</TableCell>
            <TableCell align="left">Adresse</TableCell>
            <TableCell align="left">Num Téléphone</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Montant</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
