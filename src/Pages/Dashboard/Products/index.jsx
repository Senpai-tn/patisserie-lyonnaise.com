import { Backdrop, Button, CircularProgress, Stack } from '@mui/material'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import ListProducts from './ListProducts'
import ProductForm from './ProductForm'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'

const Products = () => {
  const [productList, setProductList] = useState([])
  const [product, setProduct] = useState({})
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('add')
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const user = useSelector((state) => state.user)

  const getProducts = async () => {
    //  get list of category
    const querySnapshots = await getDocs(collection(db, 'product'))
    const x = await Promise.all(
      querySnapshots.docs.map(async (p) => {
        if (p.data().category !== undefined && p.data().category !== null) {
          const docRef = doc(db, 'category', p.data().category.id)
          const docSnap = await getDoc(docRef)
          return {
            id: p.id,
            ...p.data(),
            category: { id: docSnap.id, ...docSnap.data() },
          }
        } else return { id: p.id, ...p.data() }
      })
    )
    setProductList(x)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const onEdit = (product) => {
    setProduct({ ...product })
    setType('edit')
    setOpen(true)
  }

  const deleteProduct = (product, restore) => {
    Swal.fire({
      title: 'Etes vous sure ?',
      text: restore
        ? 'Voulez vous restorer ce produit ?'
        : `Vous ne pouvez pas faire retour de ce produit : ${product.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: restore ? 'Oui, Restore le!' : 'Oui, Supprime le!',
      cancelButtonText: 'Annuler',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const docRef = doc(db, 'product', product.id)
        const docSnap = await getDoc(docRef)
        setDoc(docRef, {
          ...docSnap.data(),
          deletedAt: restore ? null : dayjs().unix() + '',
        })
          .then(() => {
            setRowSelectionModel([])
            setProductList(
              productList.map((p) => {
                return p.id === product.id
                  ? {
                      ...product,
                      deletedAt: restore ? null : dayjs().unix() + '',
                    }
                  : p
              })
            )
            Swal.fire(
              restore ? 'Restoré' : 'Supprimé!',
              `Le produit ${product.name} a été ${
                restore ? 'restoré' : 'supprimé'
              }`,
              'success'
            )
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })
  }

  const deleteMultipleProducts = (products, restore) => {
    Promise.all(
      products.map(async (id) => {
        const docRef = doc(db, 'product', id)
        const docSnap = await getDoc(docRef)
        setDoc(docRef, {
          ...docSnap.data(),
          deletedAt: restore ? null : dayjs().unix() + '',
        })
          .then(() => {
            setTimeout(() => {
              setRowSelectionModel([])
              setProductList(
                productList.map((p) => {
                  return products.includes(p.id)
                    ? {
                        ...p,
                        deletedAt: restore ? null : dayjs().unix() + '',
                      }
                    : p
                })
              )
            }, 500)
          })
          .catch((error) => {
            console.log(error)
          })
      })
    ).then(() => {
      restore
        ? Swal.fire('Restorés!', `Tous les produits sont supprimés`, 'success')
        : Swal.fire('Supprimé!', `Tous les produits sont supprimés`, 'success')
    })
  }

  return (
    <Stack p={'20px 50px'}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={productList.length === 0}
      >
        <CircularProgress color="success" />
      </Backdrop>
      <ProductForm
        open={open}
        type={type}
        handleClose={() => {
          setOpen(false)
        }}
        productProps={product}
        productList={productList}
        setProductList={setProductList}
      />

      <Stack direction={'row'} spacing={2}>
        <Button
          onClick={() => {
            setType('add')
            setOpen(true)
            setRowSelectionModel([])
          }}
          variant="contained"
          color="success"
        >
          Ajouter Produit
        </Button>

        <Button
          disabled={rowSelectionModel.length === 0}
          variant="contained"
          color={
            productList.filter((p) => {
              return p.deletedAt
            }).length === productList.length
              ? 'primary'
              : 'error'
          }
          onClick={() => {
            deleteMultipleProducts(
              rowSelectionModel,
              productList.filter((p) => {
                return p.deletedAt
              }).length === productList.length
            )
          }}
        >
          {productList.filter((p) => {
            return p.deletedAt
          }).length === productList.length
            ? 'Restorer les produits'
            : 'Supprimer les produits sélectionnés'}
        </Button>
      </Stack>
      {/* )} */}

      <ListProducts
        onEdit={onEdit}
        onDelete={deleteProduct}
        rowSelectionModel={rowSelectionModel}
        setRowSelectionModel={setRowSelectionModel}
        rows={productList}
      />
    </Stack>
  )
}

export default Products
