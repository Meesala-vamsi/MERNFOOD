import { useContext, useEffect, useState } from "react"
import "./MyOrders.css"
import axios from "axios"
import { Context } from "../../ReactContext/Context"
import cookies from 'js-cookie'

const MyOrders = () => {
    const [data,setData] = useState([])

    const {url,token} = useContext(Context)

    useEffect(()=>{
        const getDetails=async()=>{
            const response = await axios.get(`${url}/api/cart/order/userorders`,{
                headers:{
                    Authorization:`Bearer ${cookies.get("jwtToken")}`
                }
            })
            // console.log(response)
            if(response.status===200){
                setData(response.data.data.order)
            }
        }

        getDetails()
    },[cookies.get("jwtToken")])

    // console.log(data)

  return (
    <div className="order-details-container">
        <h1>Order Details</h1>
        <ul className="order-list-container">
            {
                data.map((eachItem)=>(
                    <li className="order-list-items">
                        <div>
                            <img src={url+"/images/"+eachItem.items[0].image} alt="" />
                            <p>{eachItem.items[0].name}</p>
                        </div>
                        <div>
                            <p>PRICE</p>
                            <span className="">${eachItem.items[0].price}</span>
                        </div>
                        <div>
                            <p>PAYMENT MODE</p>
                            <span className="">Online</span>
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default MyOrders