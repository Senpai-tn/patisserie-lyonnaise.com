import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import Dashboard from './Pages/Dashboard'
import Commandes from './Pages/Dashboard/Commandes'
import AppBarComp from './Components/AppBar'
import Navigation from './Navigation'

const App = () => {
  const user = useSelector((state) => state.user)
  return <Navigation />
}

export default App
