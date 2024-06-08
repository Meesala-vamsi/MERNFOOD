
import "./Cart.css"
import { assets } from '../../Assets/frontend_assets/assets'
import { useContext } from "react"
import { Context } from "../../ReactContext/Context"
import { useNavigate } from "react-router-dom"

const Cart = () => {
    const {food_list,
        cartData,
        addCartData,
        removeCartData,
        setTotalCartAmount,url} = useContext(Context)
        let totalPrice=0
        console.log(totalPrice)

        const navigate = useNavigate()



    console.log(cartData)
  return (
    <div className="cart-container">
        <div className='cart-details'>
            <div className="cart-title-container">
                <p>Item Details</p>
                <p>Quantity</p>
                <p>Price</p>
                <p>Total</p>
            </div>
            <hr />
                { 
                    food_list.map((eachItem)=>{
                        setTotalCartAmount(totalPrice)
                        if(cartData[eachItem._id] > 0){
                            totalPrice += cartData[eachItem._id] * eachItem.price
                            return(
                            <>
                            <div className="cart-image-container cart-title-container">
                                <div className="cart-image-container">
                                    <img src={url+"/images/"+eachItem.image} alt="" />
                                    <div className="item-cont">
                                        <p>{eachItem.name}</p>
                                        {/* <p>Dish</p> */}
                                        <button onClick={()=>(removeCartData(eachItem._id))}>Remove</button>
                                    </div>
                                </div>

                            <div className="cart-count-container">
                                <img onClick={()=>(removeCartData(eachItem._id))} src={assets.remove_icon_red} alt="" />
                                <p>{cartData[eachItem._id]}</p>
                                <img onClick={()=>(addCartData(eachItem._id))} src={assets.add_icon_green} alt="" />
                            </div>
                            <p className="price">${eachItem.price}</p>
                            <p>${cartData[eachItem._id] * eachItem.price}</p>
                            </div>
                            </>
                            )
                        }
                    })
                
                }
        </div>
        <div className="order-summary">
                <h1>Order Summary</h1>
                <hr />
                <div className="cart-items-container">
                    <p>ITEMS {Object.keys(cartData).length}</p>
                    <p>${totalPrice}.00</p>
                </div>
                <div className="input-container">
                    <label htmlFor="shipping">SHIPPING</label>
                    <input type="text" placeholder="Standard Delivery - $5.00" id="shipping" />
                </div>
                <div className="input-container">
                    <label htmlFor="promocode">PROMO CODE</label>
                    <input type="text" name="" id="promocode" placeholder="Enter your code" />
                </div>
                <button className="cart-button">APPLY</button>
                <hr />
                <div className="total-cost">
                    <p>TOTAL COST</p>
                    <p>${totalPrice + 5}.00</p>
                </div>
                <button className="checkout-btn" onClick={()=>navigate("/order")}>CHECKOUT</button>
        </div>
    </div>
  )
}

export default Cart