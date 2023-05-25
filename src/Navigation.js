import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Pages/SignIn'

import {
  AppBarComp,
  Categories,
  Commandes,
  Fabrication,
  Products,
} from './Pages/Dashboard'
import Profil from './Pages/Profil'
import ResetPassword from './Pages/Profil/ResetPassword'

const Navigation = () => {
  const user = useSelector((state) => state.user)

  return (
    <BrowserRouter>
      <AppBarComp />
      {user !== null ? (
        <Routes>
          <Route path="/profil" element={<Profil />} />
          <Route path="/reset" element={<ResetPassword />} />
          {user.role === 'pa' ? (
            <>
              <Route path="/" element={<Fabrication />} />
              <Route path="*" element={<Fabrication />} />
            </>
          ) : user.role === 'ad' ? (
            <>
              <Route path="/" element={<Commandes />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/produits" element={<Products />} />
              <Route path="/fabrication" element={<Fabrication />} />
              <Route path="*" element={<p>404 NotFound</p>} />
            </>
          ) : (
            user.role === 'li' && (
              <>
                <Route path="/" element={<Commandes />} />
                <Route path="*" element={<Commandes />} />
              </>
            )
          )}
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<SignIn />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default Navigation
