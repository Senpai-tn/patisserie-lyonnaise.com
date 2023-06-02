import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../../firebase'
import actionsList from '../../Redux/actions'
import MailLockIcon from '@mui/icons-material/MailLock'
import { triggerResetEmail } from '../../utils/reinitPassword'
const Profil = () => {
  const user = useSelector((state) => state.user)
  const [formDisabled, setFormDisabled] = useState(true)
  const dispatch = useDispatch()
  const { control, handleSubmit } = useForm({
    defaultValues: { ...user },
  })

  const editAction = async (data) => {
    const { adress, email, name, phone } = data
    const docRef = doc(db, 'Users', user.id)
    const docSnap = await getDoc(docRef)
    const userUpdated = {
      ...docSnap.data(),
      adress: adress || user.adress,
      email: email || user.email,
      name: name || user.name,
      phone: phone || user.phone,
    }
    setDoc(docRef, userUpdated).then(() => {
      setFormDisabled(true)
      dispatch({
        type: actionsList.auth,
        user: userUpdated,
      })
      localStorage.setItem('user', JSON.stringify(userUpdated))
    })
  }

  return (
    <Stack
      width={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
      pt={'100px'}
    >
      <Button
        onClick={() => {
          setFormDisabled(false)
        }}
      >
        Modifier votre profil
      </Button>
      <form onSubmit={handleSubmit(editAction)} style={{ width: '40%' }}>
        <Stack>
          <Controller
            control={control}
            name="adress"
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                onChange={onChange}
                disabled={formDisabled}
                label={'Adresse'}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                onChange={onChange}
                disabled={formDisabled}
              />
            )}
          />
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                onChange={onChange}
                disabled={formDisabled}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { value, onChange } }) => (
              <TextField
                value={value}
                onChange={onChange}
                disabled={formDisabled}
              />
            )}
          />
          <Button
            color="warning"
            variant="contained"
            type="submit"
            disabled={formDisabled}
          >
            Modifier
          </Button>
          <Stack
            direction={'row'}
            marginTop={'50px'}
            alignItems={'center'}
            spacing={0.5}
            color={'#1976d2'}
          >
            <MailLockIcon
              fontSize="large"
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                triggerResetEmail(user.email)
              }}
            />
            <Typography
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                triggerResetEmail(user.email)
              }}
            >
              Réinitialiser mot de passe
            </Typography>
          </Stack>
        </Stack>
      </form>
    </Stack>
  )
}

export default Profil
