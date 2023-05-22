// import * as React from 'react'
// import PropTypes from 'prop-types'
// import Box from '@mui/material/Box'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TableRow from '@mui/material/TableRow'
// import TableSortLabel from '@mui/material/TableSortLabel'
// import Paper from '@mui/material/Paper'

// import { visuallyHidden } from '@mui/utils'
// import { Chip, TablePagination } from '@mui/material'
// import dayjs from 'dayjs'

// function descendingComparator(a, b, orderBy) {
//   if (orderBy === 'montant') {
//     var sommeA = 0
//     var sommeB = 0
//     a.list.map((item) => {
//       item.price &&
//         (sommeA += item.price.replace('€', '').replace(',', '.') * 1)
//     })
//     b.list.map((item) => {
//       item.price &&
//         (sommeB += item.price.replace('€', '').replace(',', '.') * 1)
//     })

//     return sommeA > sommeB ? -1 : 1
//   }
//   if (b[orderBy] < a[orderBy]) {
//     return -1
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1
//   }
//   return 0
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy)
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index])
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0])
//     if (order !== 0) {
//       return order
//     }
//     return a[1] - b[1]
//   })
//   return stabilizedThis.map((el) => el[0])
// }

// const headCells = [
//   {
//     id: 'nameSociete',
//     numeric: true,
//     disablePadding: true,
//     label: 'Société',
//   },
//   {
//     id: 'list',
//     numeric: false,
//     disablePadding: false,
//     label: 'Produits',
//   },
//   {
//     id: 'date',
//     numeric: false,
//     disablePadding: false,
//     label: 'Date',
//   },
//   {
//     id: 'address',
//     numeric: false,
//     disablePadding: false,
//     label: 'Adresse',
//   },
//   {
//     id: 'montant',
//     numeric: false,
//     disablePadding: false,
//     label: 'Montant',
//   },
// ]

// function EnhancedTableHead(props) {
//   const {
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort,
//   } = props
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property)
//   }

//   return (
//     <TableHead>
//       <TableRow>
//         {/* <TableCell padding="checkbox">
//            <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell> */}
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'center' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   )
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// }

// export default function ListCommandes({ rows }) {
//   const [order, setOrder] = React.useState('asc')
//   const [orderBy, setOrderBy] = React.useState('nameSociete')
//   const [page, setPage] = React.useState(0)
//   const [dense, setDense] = React.useState(false)
//   const [rowsPerPage, setRowsPerPage] = React.useState(10)
//   const [rowsVisible, setRows] = React.useState(rows)

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc'
//     setOrder(isAsc ? 'desc' : 'asc')
//     setOrderBy(property)
//   }

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

//   React.useEffect(() => {
//     setRows(
//       stableSort(rows, getComparator(order, orderBy)).slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//       )
//     )
//   }, [order, orderBy, page, rowsPerPage, rows])

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage)
//   }

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10))
//     setPage(0)
//   }

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <TableContainer>
//           <Table
//             sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//           >
//             <EnhancedTableHead
//               order={order}
//               orderBy={orderBy}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {(rowsVisible || rows).map((row) => {
//                 var somme = 0
//                 return (
//                   <TableRow
//                     hover
//                     role="checkbox"
//                     tabIndex={-1}
//                     key={row.id}
//                     sx={{ cursor: 'pointer' }}
//                   >
//                     <TableCell align="center" width={200}>
//                       {row.nameSociete !== 'null' ? row.nameSociete : ''}
//                     </TableCell>

//                     <TableCell align="left" width={600}>
//                       {row.list.map((item) => {
//                         return (
//                           <Chip
//                             sx={{ m: 1 }}
//                             label={`${item.itemsToSold} * ${item.name}`}
//                           />
//                         )
//                       })}
//                     </TableCell>
//                     <TableCell align="left" width={'250px'}>
//                       {row.date !== 'null'
//                         ? dayjs.unix(row.date).format('DD-MM-YYYY')
//                         : ''}
//                     </TableCell>
//                     <TableCell align="left">
//                       {row.address !== 'null' ? row.address : ''}
//                     </TableCell>
//                     <TableCell align="left">
//                       {row.list.map((item) => {
//                         item.price &&
//                           (somme +=
//                             item.price.replace('€', '').replace(',', '.') * 1)
//                       })}
//                       {somme.toFixed(2)} €
//                     </TableCell>
//                   </TableRow>
//                 )
//               })}
//               {emptyRows > 0 && (
//                 <TableRow
//                   style={{
//                     height: (dense ? 33 : 53) * emptyRows,
//                   }}
//                 >
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 20, 50]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       {/* <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label="Dense padding"
//       /> */}
//     </Box>
//   )
// }

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

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  }
}

function Row(props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  let somme = 0
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
          {somme.toFixed(2)} €
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Produits
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Nom Produit</TableCell>
                    <TableCell align="left">Quantité</TableCell>
                    <TableCell align="left">PU</TableCell>
                    <TableCell align="left">Prix total</TableCell>
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
                        {produit.price.replace('€', '').replace(',', '.') *
                          produit.itemsToSold}
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

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ]

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
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Phone</TableCell>
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
