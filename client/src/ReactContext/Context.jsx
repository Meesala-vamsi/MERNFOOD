import React, { useEffect, useState } from 'react'
import cookies from 'js-cookie'
import axios from 'axios'


export const Context = React.createContext()

export const ContextProvider = ({children})=>{
    const [cartData,setCartData] = useState({})
    const [getCartTotalAmount,setTotalCartAmount] = useState(0)
    const [token,setToken] = useState("")
    const [food_list,setFoodList] = useState([])
    // https://mernfood-backend.onrender.com
    const url = 'http://localhost:3001'


    //ADD TO CART API

    const addCartData= async(itemId)=>{
        if(!cartData[itemId]){
            setCartData((prevState)=>({...prevState,[itemId]:1}))
        }else{
            setCartData((prevState)=>({...prevState,[itemId]:prevState[itemId]+1}))
        }

        if(token){
            await axios.post(`${url}/api/cart`,{id:itemId},{headers:{Authorization:`Bearer ${token}`}})
        }
    }

    //REMOVE FROM CART API

    const removeCartData=async(itemId)=>{
        setCartData((prevState)=>({...prevState,[itemId]:prevState[itemId]-1}))
        if(token){
            await axios.post(`${url}/api/cart/remove`,{id:itemId},{headers:{Authorization:`Bearer ${token}`}})
        }
    }

    //CART DATA API

    const getCartData=async(jwt)=>{
        const response = await axios.get(`${url}/api/cart`,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
       if(response.status===200){
            setCartData(response.data.cartData)
       }
    }

    //FOOD DATA API

    const fetchFoodData=async()=>{
        const response = await axios.get(`${url}/api/food/list`)
        console.log(response)
        if(response.status===200){
            setFoodList(response.data.data.foods)
        }
    }

    //FETCH DATA AUTOMATICALLY WHEN WE RELOAD THE PAGE

    useEffect(()=>{
        async function loadData(){
        if(cookies.get("jwtToken")){
            await fetchFoodData()
            setToken(cookies.get("jwtToken"))
            await getCartData(cookies.get("jwtToken"))
        }}

        loadData()
    },[token])

    return(
        <Context.Provider value={{
            food_list,
            setFoodList,
            cartData,
            setCartData,
            addCartData,
            removeCartData,
            setTotalCartAmount,
            getCartTotalAmount,
            url,
            token,setToken
        }}>
            {children}
        </Context.Provider>
    )
}