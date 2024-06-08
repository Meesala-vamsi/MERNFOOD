import React from 'react'
import Navbar from '../src/components/Navbar/Navbar'
import Sidebar from '../src/components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from "./Pages/Add/Add"
import List from "./Pages/List/List"
import Orders from "./Pages/Orders/Orders"
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add/>}/>
          <Route path='/list' element={<List/>}/>
          <Route path="/orders" element={<Orders/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App