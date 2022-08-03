import React from 'react'
import HomePage from '../pages/HomePage'
import BooksPage from '../pages/BooksPage'
import InfoPage from '../pages/InfoPage'
import MyZonePage from '../pages/MyZonePage'
// import ResiterPage from '../pages/RegisterPage'
import ErrorPage from "../pages/ErrorPage";
import { Routes, Route } from 'react-router-dom'
import PrivateRoute  from '../utils/PrivateRoute'
import Reg from '../pages/Reg'


const AnimatedRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/my-zone" element={<MyZonePage />} />
        </Route>
        <Route path="/register" element={<Reg />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
  )
}

export default AnimatedRoutes