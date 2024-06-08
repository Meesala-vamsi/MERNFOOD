import React, { useContext, useState } from 'react'
import cookies from 'js-cookie'
import {assets} from '../../Assets/frontend_assets/assets'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Context } from '../../ReactContext/Context';
import { toast } from 'react-toastify';

const Navbar = ({setCurrStatus}) => {
  const [isHover,setIsHover] = useState("home")
  const {token,setToken} = useContext(Context)
  const navigate=useNavigate()

  const onClickSignin=()=>{
    setCurrStatus(true)
    document.body.classList.add("on-scroll")
  }

  const onClickMyOrders=()=>{
    navigate("/myorders")
  }

  const onClickLogout=()=>{
    
    const cookieToken = cookies.remove("jwtToken")
    if(cookieToken===undefined){
      setToken("")
      navigate('/')
      toast.success("Logout Successfully...")
    }
  }
  return (

    <div className='navbar'>
        <img src={assets.logo} alt="" />
        <ul className='navbar-middle'>
          <Link to='/'>
            <a  href="#home" className={isHover==="home"?"hovered":""} onClick={()=>setIsHover("home")}>Home</a>
          </Link>
            <a href="#menu" className={isHover==="menu"?"hovered":""} onClick={()=>setIsHover("menu")}>Menu</a>

            <a href='#mobile-app' className={isHover==="mobile-app"?"hovered":""} onClick={()=>setIsHover("mobile-app")}>Mobile App</a>
            <a href='#contact-us' className={isHover==="contact-us"?"hovered":""} onClick={()=>setIsHover("contact-us")}>Contact Us</a>
        </ul>
        <div className='navbar-right'>
            <SearchIcon className='nav-icon'/>
            <Link to="/cart">
              <ShoppingCartIcon className='nav-icon'/>
            </Link>
            {!token?<button  onClick={()=>onClickSignin()}>Sign In</button>:
              <div className='nav-profile-container'>
                  <img src="https://res.cloudinary.com/db0f83m76/image/upload/v1711704711/unnamed_wfzswu.jpg" alt="profile" className='nav-profile-image' />
                  <div className='order-logout-container'>
                    <div onClick={onClickMyOrders}>
                      <ShoppingBagOutlinedIcon className='bag-icon'/>
                      <p>Orders</p>
                    </div>
                    <button onClick={onClickLogout}>Logout</button>
                  </div>
              </div>
            }
            
        </div>
    </div>

  )
}

export default Navbar