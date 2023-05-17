import React, { useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth, db } from './firebase'
import { collection, getDocs, doc, setDoc, addDoc } from 'firebase/firestore'

const Login = () => {
  const loginAction = async () => {
    // Ajout category
    // const collectionRef = collection(db, 'category')
    // const payload = {
    //   name: 'window.location.origin',
    // }
    // const docRef = await addDoc(collectionRef, payload)
    //
    //get list of category
    // const querySnapshot = await getDocs(collection(db, 'category'))
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, ' => ', doc.data())
    // })
    //
    // signUp
    // createUserWithEmailAndPassword(
    //   auth,
    //   'khaledsahli36@gmail.com',
    //   'Clubisti199'
    // )
    //   .then((value) => {
    //     console.log(value.user)
    //   })
    //   .catch((error) => {
    //     console.log('error', error)
    //   })
    //
    // signIn
    // signinWithEmailAndPassword(
    //   auth,
    //   'khaledsahli36@gmail.com',
    //   'Clubisti199'
    // )
    //   .then((value) => {
    //     console.log(value.user)
    //   })
    //   .catch((error) => {
    //     console.log('error', error)
    //   })
  }

  return <div>Login</div>
}

export default Login
