import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import Dashboard from './Pages/Dashboard'

const App = () => {
  const user = useSelector((state) => state.user)
  return (
    <BrowserRouter>
      {user !== null ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/categories" element={<Dashboard />} />
          <Route path="/produits" element={<Dashboard />} />
          <Route path="/fabrication" element={<Dashboard />} />
          <Route path="*" element={<p>404 NotFound</p>} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<SignIn />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
