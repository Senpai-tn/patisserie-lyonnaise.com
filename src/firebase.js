// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBGiw5HuXi-Y8t7DcZq4L7wmHPbFFZm6l4',
  authDomain: 'patisserie-lyonnaise.firebaseapp.com',
  projectId: 'patisserie-lyonnaise',
  storageBucket: 'patisserie-lyonnaise.appspot.com',
  messagingSenderId: '746942555129',
  appId: '1:746942555129:web:4797532205d77df878d328',
  measurementId: 'G-WD9YG7H4VT',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
