import React from 'react'
import "./Sidebar.css"
import AddIcon from '@mui/icons-material/Add';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <NavLink to="/add" className='sidebar-icon-container'>
        <AddIcon className='sidebar-icon'/>
        <p>Add Items</p>
      </NavLink>
      <NavLink to="/list" className='sidebar-icon-container'>
        <EventAvailableIcon className='sidebar-icon'/>
        <p>List Items</p>
      </NavLink>
      <NavLink to="/orders" className='sidebar-icon-container'>
        <EventAvailableIcon className='sidebar-icon'/>
        <p>Orders</p>
      </NavLink>
    </div>
  )
}

export default Sidebar