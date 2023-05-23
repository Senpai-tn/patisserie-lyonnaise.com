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

const Navigation = () => {
  const user = useSelector((state) => state.user)

  return (
    <BrowserRouter>
      <AppBarComp />
      {user !== null ? (
        user.role === 'pa' ? (
          <Routes>
            <Route path="/" element={<Fabrication />} />
            <Route path="*" element={<Fabrication />} />
          </Routes>
        ) : user.role === 'ad' ? (
          <Routes>
            <Route path="/" element={<Commandes />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/produits" element={<Products />} />
            <Route path="/fabrication" element={<Fabrication />} />
            <Route path="*" element={<p>404 NotFound</p>} />
          </Routes>
        ) : (
          user.role === 'li' && (
            <Routes>
              <Route path="/" element={<Commandes />} />
              <Route path="*" element={<Commandes />} />
            </Routes>
          )
        )
      ) : (
        <Routes>
          <Route path="*" element={<SignIn />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default Navigation
