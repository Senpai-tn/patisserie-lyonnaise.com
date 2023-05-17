import React from 'react'
import Categories from './Categories'
import AppBarComp from '../../Components/AppBar'
import Products from './Products'
import Commandes from './Commandes'
import Fabrication from './Fabrication'

const Dashboard = () => {
  return (
    <div>
      <AppBarComp />
      {window.location.pathname === '/' ? (
        <Commandes />
      ) : window.location.pathname === '/categories' ? (
        <Categories />
      ) : window.location.pathname === '/fabrication' ? (
        <Fabrication />
      ) : (
        <Products />
      )}
    </div>
  )
}

export default Dashboard
