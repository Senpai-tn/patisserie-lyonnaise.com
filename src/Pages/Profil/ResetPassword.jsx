import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const auth = getAuth()
  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, 'khaledd.sahli@gmail.com')
    console.log('Password reset email sent')
  }
  return (
    <button className="resetBtn" type="button" onClick={triggerResetEmail}>
      Ripristina password
    </button>
  )
}

export default ResetPassword
