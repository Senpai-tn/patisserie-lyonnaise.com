import { Backdrop, Button, CircularProgress, Typography } from '@mui/material'
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import CategoryForm from './CategoryForm'
import ListCategories from './ListCategories'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'

const Categories = () => {
  const [categoryList, setCategoryList] = useState([])
  const [category, setCategory] = useState({})
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('add')
  const [rowSelectionModel, setRowSelectionModel] = useState([])
  const user = useSelector((state) => state.user)
  const getCategories = async () => {
    //  get list of category
    const querySnapshots = await getDocs(collection(db, 'category'))
    setCategoryList(
      querySnapshots.docs.map((c) => {
        return { id: c.id, ...c.data() }
      })
    )
  }

  useEffect(() => {
    getCategories()
  }, [])

  const onEdit = (category) => {
    setCategory(category)
    setType('edit')
    setOpen(true)
  }

  const deleteCategory = (category, restore) => {
    Swal.fire({
      title: 'Etes vous sure ?',
      text: restore
        ? 'Voulez vous restorer cette catégorie ?'
        : `Vous ne pouvez pas faire retour de cette catégorie : ${category.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: restore ? 'Oui, Restore le!' : 'Oui, Supprime le!',
      cancelButtonText: 'Annuler',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const docRef = doc(db, 'category', category.id)
        const docSnap = await getDoc(docRef)
        setDoc(docRef, {
          ...docSnap.data(),
          deletedAt: restore ? null : dayjs().format('DD-MM-YYYY'),
        })
          .then(() => {
            setRowSelectionModel([])
            setCategoryList(
              categoryList.map((p) => {
                return p.id === category.id
                  ? {
                      ...category,
                      deletedAt: restore ? null : dayjs().format('DD-MM-YYYY'),
                    }
                  : p
              })
            )
            Swal.fire(
              restore ? 'Restoré' : 'Supprimé!',
              `La catégorie ${category.name} a été ${
                restore ? 'restorée' : 'supprimée'
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

  const deleteMultipleCategories = (categories, restore) => {
    Promise.all(
      categories.map(async (id) => {
        const docRef = doc(db, 'category', id)
        const docSnap = await getDoc(docRef)
        setDoc(docRef, {
          ...docSnap.data(),
          deletedAt: restore ? null : dayjs().format('DD-MM-YYYY'),
        })
          .then(() => {
            setTimeout(() => {
              setRowSelectionModel([])
              setCategoryList(
                categoryList.map((p) => {
                  return categories.includes(p.id)
                    ? {
                        ...p,
                        deletedAt: restore
                          ? null
                          : dayjs().format('DD-MM-YYYY'),
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
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={categoryList.length === 0}
      >
        <CircularProgress color="success" />
      </Backdrop>
      <CategoryForm
        open={open}
        type={type}
        handleClose={() => {
          setOpen(false)
        }}
        category={category}
        categoryList={categoryList}
        setCategoryList={setCategoryList}
      />
      {/* {user.role === 'admin' && ( */}
      <>
        <Button
          onClick={() => {
            setType('add')
            setOpen(true)
            setRowSelectionModel([])
          }}
          variant="contained"
          color="success"
        >
          Ajouter Catégorie
        </Button>

        <Button
          disabled={rowSelectionModel.length === 0}
          variant="contained"
          color={
            categoryList.filter((p) => {
              return p.deletedAt
            }).length === categoryList.length
              ? 'primary'
              : 'error'
          }
          onClick={() => {
            deleteMultipleCategories(
              rowSelectionModel,
              categoryList.filter((p) => {
                return p.deletedAt
              }).length === categoryList.length
            )
          }}
        >
          {categoryList.filter((p) => {
            return p.deletedAt
          }).length === categoryList.length
            ? 'Restorer les catégories'
            : 'Supprimer les catégories sélectionnées'}
        </Button>
      </>
      {/* )} */}

      <ListCategories
        onEdit={onEdit}
        onDelete={deleteCategory}
        rowSelectionModel={rowSelectionModel}
        setRowSelectionModel={setRowSelectionModel}
        rows={categoryList}
      />
    </>
  )
}

export default Categories
