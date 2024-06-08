import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Context } from '../../ReactContext/Context'
import axios from 'axios'

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams()
    const navigate=useNavigate()

    const success=searchParams.get("success")
    const orderId=searchParams.get("orderId")
    console.log(success,orderId)

    const {url} = useContext(Context)
    useEffect(()=>{
        const verifyPAyment = async ()=>{
            const response = await axios.post(`${url}/api/cart/order/verify`,{success,orderId})
            console.log(response)
    
            if(response.data.status==="success"){
                navigate('/myorders')
            }else{
                navigate("/")
            }
        }

        verifyPAyment()
    },[])

  return (
    <div className=''>

    </div>
  )
}

export default Verify