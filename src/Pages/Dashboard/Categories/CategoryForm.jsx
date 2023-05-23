import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Controller, useForm } from 'react-hook-form'
import { Button, TextField } from '@mui/material'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function CategoryForm({
  type,
  open,
  handleClose,
  category,
  categoryList,
  setCategoryList,
}) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: type === 'add' ? '' : category.name,
    },
  })

  const onSubmit = async (data) => {
    if (type === 'add') {
      // Ajout category
      const collectionRef = collection(db, 'category')
      const payload = {
        name: data.name,
      }
      const docRef = await addDoc(collectionRef, payload)
      console.log({
        id: docRef.id,
        data: () => {
          return {
            name: data.name,
            deletedAt: '',
          }
        },
      })
      setCategoryList([
        ...categoryList,
        {
          id: docRef.id,
          name: data.name,
          deletedAt: '',
        },
      ])
      handleClose()
    } else {
      const docRef = doc(db, 'category', category.id)
      const docSnap = await getDoc(docRef)
      setDoc(docRef, {
        ...docSnap.data(),
        name: data.name || category.name,
        deletedAt: '',
      })
        .then(() => {
          handleClose()
          setCategoryList(
            categoryList.map((p) => {
              return p.id === category.id
                ? {
                    id: category.id,
                    name: data.name || category.name,
                    deletedAt: '',
                  }
                : p
            })
          )
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  // const onSubmit = async (data) => {
  //   const { category, price, name } = data
  //   var imageURL = null
  //   const storageRef = ref(storage, 'image' + dayjs().toISOString())

  //   selectedImage &&
  //     (await uploadBytes(storageRef, selectedImage).then(async (snapshot) => {
  //       await getDownloadURL(snapshot.ref).then((downloadURL) => {
  //         imageURL = downloadURL
  //       })
  //     }))

  //   const product = {
  //     name,
  //     price,
  //     image: imageURL,
  //     category: category ? category : null,
  //     deletedAt: '',
  //   }
  //   if (type === 'edit' && productProps) {
  //     //update Doc
  //     const docRef = doc(db, 'product', productProps.id)
  //     const docSnap = await getDoc(docRef)
  //     setDoc(docRef, {
  //       ...docSnap.data(),
  //       name: name || productProps.name,
  //       price: price || productProps.price,
  //       image:
  //         selectedImage && imageURL !== null ? imageURL : productProps.image,
  //       category: category ? { ...category } : null,
  //       deletedAt: '',
  //     })
  //       .then(() => {
  //         handleClose()
  //         setProductList(
  //           productList.map((p) => {
  //             return p.id === productProps.id
  //               ? {
  //                   id: productProps.id,
  //                   name: name || productProps.name,
  //                   price: price || productProps.price,
  //                   image:
  //                     selectedImage && imageURL !== null
  //                       ? imageURL
  //                       : productProps.image,
  //                   category: category ? { ...category } : null,
  //                   deletedAt: '',
  //                 }
  //               : p
  //           })
  //         )
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //   } else {
  //     const collectionRef = collection(db, 'product')
  //     await addDoc(collectionRef, product)
  //       .then((docRef) => {
  //         setProductList([
  //           {
  //             id: docRef.id,
  //             name,
  //             price,
  //             image: imageURL,
  //             category: category ? category : null,
  //             deletedAt: '',
  //           },
  //           ...productList,
  //         ])
  //         handleClose()
  //       })
  //       .catch((error) => {
  //         console.log('Error : ' + error.message)
  //       })
  //   }
  // }

  useEffect(() => {
    console.log(type, category)
    reset({ name: type === 'edit' && category !== {} ? category.name : '' })
  }, [category, type])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: {
                value: true,
                message: 'Nom est un champs obligatoire',
              },
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextField
                value={value}
                onChange={onChange}
                label={'Nom du Catégorie'}
                error={!!error}
                helperText={error && error.message}
              />
            )}
          />

          {type === 'add' ? (
            <Button type="submit" color="success">
              Ajouter
            </Button>
          ) : (
            <Button type="submit" color="warning">
              Modifier
            </Button>
          )}
        </form>
      </Box>
    </Modal>
  )
}
