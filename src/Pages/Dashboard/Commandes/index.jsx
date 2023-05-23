import { Backdrop, Button, CircularProgress } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import ListCommandes from './ListCommandes'

const Commandes = () => {
  const [productList, setProductList] = useState([])
  const [product, setProduct] = useState({})
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const getCommandes = async () => {
    //  get list of category
    const querySnapshots = await getDocs(collection(db, 'Commande'))

    const x = await Promise.all(
      querySnapshots.docs.map(async (c) => {
        return { id: c.id, ...c.data() }
      })
    )
    setProductList(x)
    setLoading(false)
  }

  useEffect(() => {
    getCommandes()
  }, [])

  const onEdit = (product) => {
    setProduct(product)
    setOpen(true)
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="success" />
      </Backdrop>

      <ListCommandes
        onEdit={onEdit}
        rowSelectionModel={rowSelectionModel}
        setRowSelectionModel={setRowSelectionModel}
        rows={productList}
      />
    </>
  )
}

export default Commandes
