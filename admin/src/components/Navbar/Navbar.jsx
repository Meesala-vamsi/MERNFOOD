import React from 'react'
import './Navbar.css'
import logo from '../../Assets/admin_logo.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt="admin" className='admin-logo' />
      <img src="https://res.cloudinary.com/db0f83m76/image/upload/v1708003261/blank-profile-picture-973460_1280_qwwp4w.png" alt="" className='profile-logo' />
    </div>
  )
}

export default Navbar