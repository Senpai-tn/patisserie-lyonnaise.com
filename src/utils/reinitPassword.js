import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import Swal from 'sweetalert2'

const triggerResetEmail = async (email) => {
  return await sendPasswordResetEmail(auth, email).then(() => {
    Swal.fire('Succés', 'Un mail a été envoyé à votre adresse mail', 'success')
  })
}

export { triggerResetEmail }
