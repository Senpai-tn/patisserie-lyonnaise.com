import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Controller, useForm } from 'react-hook-form'
import { Button, Autocomplete, TextField, Stack } from '@mui/material'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import { db, storage } from '../../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import dayjs from 'dayjs'

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

export default function ProductForm({
  type,
  open,
  handleClose,
  productProps,
  productList,
  setProductList,
}) {
  const [categories, setCategories] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  const onImageChange = (event) => {
    setSelectedImage(event.target.files[0])
  }
  const getCategories = async () => {
    //  get list of category
    const querySnapshots = await getDocs(collection(db, 'category'))
    setCategories(
      querySnapshots.docs.map((c) => {
        return { id: c.id, ...c.data() }
      })
    )
    console.log(querySnapshots.docs)
  }

  useEffect(() => {
    getCategories()
  }, [])
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: type === 'add' ? '' : productProps.name,
      price: type === 'add' ? '' : productProps.price,
    },
  })

  const onSubmit = async (data) => {
    const { category, price, name } = data
    var imageURL = null
    const storageRef = ref(storage, 'image' + dayjs().toISOString())

    selectedImage &&
      (await uploadBytes(storageRef, selectedImage).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then((downloadURL) => {
          imageURL = downloadURL
        })
      }))

    const product = {
      name,
      price,
      image: imageURL,
      category: category ? category : null,
      deletedAt: '',
    }
    if (type === 'edit' && productProps) {
      //update Doc
      const docRef = doc(db, 'product', productProps.id)
      const docSnap = await getDoc(docRef)
      setDoc(docRef, {
        ...docSnap.data(),
        name: name || productProps.name,
        price: price || productProps.price,
        image:
          selectedImage && imageURL !== null ? imageURL : productProps.image,
        category: category ? { ...category } : null,
        deletedAt: '',
      })
        .then(() => {
          handleClose()
          setProductList(
            productList.map((p) => {
              return p.id === productProps.id
                ? {
                    id: productProps.id,
                    name: name || productProps.name,
                    price: price || productProps.price,
                    image:
                      selectedImage && imageURL !== null
                        ? imageURL
                        : productProps.image,
                    category: category ? { ...category } : null,
                    deletedAt: '',
                  }
                : p
            })
          )
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      const collectionRef = collection(db, 'product')
      await addDoc(collectionRef, product)
        .then((docRef) => {
          setProductList([
            {
              id: docRef.id,
              name,
              price,
              image: imageURL,
              category: category ? category : null,
              deletedAt: '',
            },
            ...productList,
          ])
          handleClose()
        })
        .catch((error) => {
          console.log('Error : ' + error.message)
        })
    }
  }

  useEffect(() => {
    reset({
      name: type === 'edit' && productProps !== {} ? productProps.name : '',
      price: type === 'edit' && productProps !== {} ? productProps.price : '',
      category:
        type === 'edit' && productProps !== {} ? productProps.category : '',
    })
  }, [productProps, type])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Controller
              control={control}
              name="name"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error && error.message}
                  label={'Nom'}
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Autocomplete
                  fullWidth
                  includeInputInList
                  id="tags-standard"
                  options={categories.filter((c) => {
                    return !c.deletedAt
                  })}
                  getOptionLabel={(option) => option.name || ''}
                  defaultValue={[]}
                  onChange={(event, item) => {
                    onChange(item)
                  }}
                  isOptionEqualToValue={(option, value) => option === value}
                  value={value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Catégorie"
                      placeholder="Favorites"
                    />
                  )}
                />
              )}
            />
            <Controller
              name="image"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <input
                  accept="image/png, image/gif, image/jpeg"
                  type="file"
                  name="image"
                  value={value}
                  onChange={(event) => onImageChange(event)}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  label={'Prix'}
                  type="number"
                  value={value}
                  onChange={onChange}
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
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}
