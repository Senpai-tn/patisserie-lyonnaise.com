import { Link, Typography } from '@mui/material'
import React from 'react'

const index = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link target="_blank" color="inherit" href="https://ccconnect.fr">
        Connect{' '}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default index
