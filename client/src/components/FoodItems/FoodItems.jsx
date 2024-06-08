import React, { useContext, useState } from 'react'
import { assets } from '../../Assets/frontend_assets/assets';
import './FoodItems.css'
import { Context } from '../../ReactContext/Context';

const FoodItems = (props) => {
  const {cartData,addCartData,removeCartData,url} = useContext(Context)
  
  return (
    <div className='food-items-container'>
      <div className='food-item-image-container'>
        <img src={url+"/images/"+props.item.image} alt="" className='food-image' />
        {
            !cartData[props.item._id]?
            <img src={assets.add_icon_white} className='white-icon' onClick={()=>(addCartData(props.item._id))} alt=''/>
            :
            <div className='add-cart-container'>
              <img src={assets.remove_icon_red} alt="" className='cart-icon' onClick={()=>(removeCartData(props.item._id))} />
              {cartData[props.item._id]}
              <img src={assets.add_icon_green} alt="" className='cart-icon' onClick={()=>(addCartData(props.item._id))} />
            </div>
        }
      </div>
      <div className='food-items-content'>
        <div className='food-items-ratings'>
          <h1>{props.item.name}</h1>
          <img src={assets.rating_starts} alt="ratings" />
        </div>
        <p>{props.item.description}</p>
        <p className='price'>${props.item.price}</p>
      </div>
    </div>
  )
}

export default FoodItems