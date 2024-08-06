import { useEffect, useState } from "react"
import axios from "axios"
import "./List.css"
import DeleteIcon from '@mui/icons-material/Delete';
import {toast} from "react-toastify"

const url="https://mernfood-backend.onrender.com"
const List = () => {
  const [list,setList] = useState([])
  useEffect(()=>{
    const getLists=async()=>{
      

      const response = await axios.get(`${url}/api/food/list`)
      if(response.status===200){
        setList(response.data.data.foods)
      }else{
        toast.error(response.data.data.message)
      }
    }

    getLists()
  },[list])

  const onClickDelete= async (id)=>{
      const response = await axios.delete(`${url}/api/food/${id}`)
      console.log(response)
      if(response.status===200){
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
  }
  return (
    <div className="list-product-container">
        <h1>Food List</h1>
        <div className="list-product-item">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Remove</span>
        </div>
        {
          list.map((eachItem,index)=>(
            <div key={index} className="list-product-item list-items-er">
              <img src={`${url}/images/${eachItem.image}`} alt="" />
              <p>{eachItem.name}</p>
              <p>{eachItem.category}</p>
              <p>{eachItem.price}</p>
              <DeleteIcon className="delete-icon" const onClick={()=>onClickDelete(eachItem._id)}/>
            </div>
          ))
        }
    </div>
  )
}

export default List