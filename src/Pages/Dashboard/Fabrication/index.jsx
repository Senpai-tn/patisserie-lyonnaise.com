import { Backdrop, CircularProgress } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import ListCommandesPerProduct from './ListCommandesPerProduct'

const Fabrication = () => {
  const [commandeList, setCommandeList] = useState([])

  const getCommandes = async () => {
    //  get list of category
    const querySnapshots = await getDocs(collection(db, 'Commande'))
    const x = await Promise.all(
      querySnapshots.docs.map(async (c) => {
        return { id: c.id, ...c.data() }
      })
    )
    setCommandeList(x)
  }

  useEffect(() => {
    getCommandes()
  }, [])

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={commandeList.length === 0}
      >
        <CircularProgress color="success" />
      </Backdrop>

      <ListCommandesPerProduct commandeList={commandeList} />
    </>
  )
}

export default Fabrication
