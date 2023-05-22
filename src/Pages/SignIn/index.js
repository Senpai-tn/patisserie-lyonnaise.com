import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Footer from '../../Components/Footer'
import { auth, db } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import actionsList from '../../Redux/actions'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'

export default function SignIn() {
  const [checked, setChecked] = React.useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
      .then(async (value) => {
        const docRef = doc(db, 'Users', value.user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.data()) {
          dispatch({ type: actionsList.auth, user: docSnap.data() })
          if (checked) {
            localStorage.setItem('user', JSON.stringify(docSnap.data()))
          }
          navigate('/')
        } else alert('user not found')
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') alert('wrong-password')
        else if (error.code === 'auth/user-not-found') alert('user not found')
        else if ('auth/too-many-requests') alert('auth/too-many-requests')
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            name="remember"
            control={
              <Checkbox
                checked={checked}
                onChange={() => {
                  setChecked(!checked)
                }}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Footer sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
