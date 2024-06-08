import React, { useContext, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import {Context} from '../../ReactContext/Context'
import axios from "axios"
import {toast} from 'react-toastify'
import './LoginPopup.css'
import cookies from 'js-cookie'


const LoginPopup = ({setCurrStatus}) => {
    const [getStatus,setStatus] = useState("Login")

    const {url,setToken,token} = useContext(Context)
    const [loginData,setLoginData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onClickClose=()=>{
        setCurrStatus(false)
        document.body.classList.remove("on-scroll")
    }

    const onChangeHandler=(event)=>{
        const name=event.target.name 
        const value = event.target.value 
        setLoginData((prev)=>({...prev,[name]:value}))
    }


    
    const onSubmitAuth= async (event)=>{
        event.preventDefault()
        console.log(loginData)
        let newUrl=url
        if(getStatus === "Login"){
            newUrl += "/api/user/login"
        }else{
            newUrl+="/api/user/signup"
        }
        console.log(newUrl)
        const response = await axios.post(newUrl,loginData)
        console.log(response)
        if(response.status===200){
            setToken(response.data.token)
            cookies.set("jwtToken",response.data.token,{expires:3})
            toast.success(response.data.message)
            document.body.classList.remove("on-scroll")
            setCurrStatus(false)
            
        }
        else if(response.status===201){
            toast.success(response.data.message)
            document.body.classList.remove("on-scroll")
            setCurrStatus(false)
        }
        else{
            toast.error(response.data.message)
        }
    }



  return (
    <div className='login-popup'>
        <div className='pop-up'>
            <div className='login-name-container'>
                <p>{getStatus}</p>
                <CloseIcon onClick={()=>onClickClose()} className='close-icon'/>
            </div>
            <form className='login-form-container' onSubmit={onSubmitAuth} >
                {getStatus==="Sign Up"&& <input type='text' name="name" value={loginData.name} placeholder='Enter Username' onChange={onChangeHandler} />} 
                <input type="text" name="email" value={loginData.email} placeholder='Enter Your Email' onChange={onChangeHandler} />
                <input type="password" name="password" value={loginData.password} placeholder='Enter Password' onChange={onChangeHandler} />
                <button type='submit'>{getStatus}</button>
                <div className='checkbox-container'>
                    <div className='checkbox'>
                        <input type="checkbox" />
                        <p>By Continuing I agree terms of use & privacy policy.</p>
                    </div>
                    <div>
                    {
                        getStatus==="Login"?<p>Create a new account? <span onClick={()=>setStatus("Sign Up")}>click here</span></p>:
                        <p>Already have an account? <span onClick={()=>setStatus("Login")}>Please Login Here</span></p>
                    
                    }
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPopup