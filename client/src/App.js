import "./App.css"
import Navbar from './components/Navbar/Navbar'
import {Route, Routes} from 'react-router-dom'
import Home from "./pages/Home/Home"
import { ContextProvider } from "./ReactContext/Context"
import Footer from "./components/Footer/Footer"
import LoginPopup from "./components/LoginPopup/LoginPopup"
import { useState } from "react"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from "./pages/Verify/Verify"
import MyOrders from "./pages/MyOrders/MyOrders"

const App = () => {
  const [currStatus,setCurrStatus] = useState(false)
  return (
    <ContextProvider>
      <ToastContainer/>
      {currStatus?
        <LoginPopup setCurrStatus={setCurrStatus}/>:<></>
      }
      <div className="app">
        <Navbar setCurrStatus={setCurrStatus}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/order" element={<PlaceOrder/>}/>
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/myorders" element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer path="/footer"/>
    </ContextProvider>
  )
}

export default App