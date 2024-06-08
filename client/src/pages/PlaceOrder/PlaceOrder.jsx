import React, { useContext, useState } from 'react'
import { Context } from '../../ReactContext/Context'
import './PlaceOrder.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
    const {setTotalCartAmount,getCartTotalAmount,cartData,token,food_list,url} = useContext(Context)
    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        zipcode:"",
        country:"",
        phone:""
    })
    console.log(token)
    const onClickHandler=(event)=>{
        const name=event.target.name
        const value=event.target.value
        setData((prev)=>({...prev,[name]:value}))
    }

    const placeOrder = async(event)=>{
        event.preventDefault()
        let orderItems =[]
        food_list.map((item)=>{
            if(cartData[item._id]>0){
                let itemInfo=item;
                itemInfo["quantity"] = cartData[item._id]
                orderItems.push(itemInfo)
            }
        })


        let orderData = {
            address:data,
            items:orderItems,
            amount:getCartTotalAmount+2

        }

        if(orderData.items.length>0){

            const response = await axios.post(`${url}/api/cart/order`,orderData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            if(response.status===200){
                const {session_url} = response.data
                window.location.replace(session_url)
            }
        }else{
            toast.error("Please add items into cart..")
        }
    }




  return (
    <form className='place-order' onSubmit={placeOrder}>
        <div className='place-order-address'>
            <h1>Delivery Information</h1>
            <div className='multi-fields'>
                <input required name="firstName" value={data.firstName} onChange={onClickHandler} type="text" placeholder='First Name' />
                <input required name="lastName" value={data.lastName} onChange={onClickHandler} type="text" placeholder='Last Name' />
            </div>
            <input required name="email" value={data.email} onChange={onClickHandler} type="text" placeholder='Email Address' />
            <input required name="street" value={data.street} onChange={onClickHandler} type="text" placeholder='Street' />
            <div className='multi-fields'>
                <input required name="city" value={data.city} onChange={onClickHandler} type="text" placeholder='City' />
                <input required name="state" value={data.state} onChange={onClickHandler} type="text" placeholder='State' />
            </div>
            <div className='multi-fields'>
                <input required name="zipcode" value={data.zipcode} onChange={onClickHandler} type="text" placeholder='Zipcode' />
                <input required name="country" value={data.country} onChange={onClickHandler} type="text" placeholder='Country' />
            </div>
            <input required name="phone" value={data.phone} onChange={onClickHandler} type="text" placeholder='Phone' />
        </div>
        <div className='cart-total-container'>
            <h2>Cart Totals</h2>
            <div>
                <p>Subtotal</p>
                <p>${getCartTotalAmount}</p>
            </div>
            <hr />
            <div>
                <p>Delivery Fee</p>
                <p>$5</p>
            </div>
            <hr />
            <div>
                <p>Total</p>
                <p>${getCartTotalAmount+5}</p>
            </div>
            <button type='submit' className="checkout-btn" >PROCEED TO PAY</button>
        </div>
    </form>
  )
}

export default PlaceOrder