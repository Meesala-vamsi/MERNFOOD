import { useState } from "react";
import "./Add.css"

import axios from "axios"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from "react-toastify";

const Add = () => {
  const [image,setImage] = useState(false)
  const [category,setCategory] = useState("Salad")
  const [data,setData]=useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })
const onClickHandle=(e)=>{
  if(e.target.name!=="" && e.target.value!==""){
    const name = e.target.name 
  const value = e.target.value
  setData((data)=>({...data,[name]:value}))
  }
}
  

const setFormDetails=async(e)=>{
  e.preventDefault()

  const url = "http://localhost:3001"
  const formData = new FormData()

  formData.append("name",data.name)
  formData.append("description",data.description)
  formData.append("price",parseInt(data.price))
  formData.append("category",data.category)
  formData.append("image",image)

  // const options = {
  //   method:"POST",
  //   body:formData
  // }

  const response = await axios.post(`${url}/api/food`,formData,{
    headers:{
      'Content-Type': 'multipart/form-data'
    }
  })
  console.log(response)
  if(response.status===201){
    setData({
      name:"",
      description:"",
      price:"",
      category:"Salad"
    })

    setImage(false)
    toast.success(response.data.message)
  }else{
    toast.error(response.data.message)
  }

}


  return (
    <div className="add-container">
      <form className="flex-col" onSubmit={setFormDetails}>
        <div className="upload-container flex-col">
          <label htmlFor="image-file">
              <p>upload</p>
              <CloudUploadIcon/>
          </label>
          <img src={image&&URL.createObjectURL(image)} alt="" className={image?"uploaded-imge":"not-uploaded"} />
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" hidden id='image-file' required />
        </div>
        <div className="product-name-container flex-col">
          <label htmlFor="productname">Product name</label>
          <input onChange={onClickHandle} name="name" value={data.name} type="text" id="productname" />
        </div>
        <div className="product-description">
          <p>Product description</p>
          <textarea onChange={onClickHandle} value={data.description} name="description" rows="6" cols="44"></textarea>
        </div>
        <div className="product-category-price">
          <div className="product-category">
            <p>Category</p>
            <select onChange={onClickHandle} value={data.category} name="category" >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Noodles">Noodles</option>
              <option value="Pastha">Pastha</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
            </select>
          </div>
          <div className="product-price">
            <p>Price</p>
            <input onChange={onClickHandle} name="price" value={data.price} type="text" placeholder="$20" />
          </div>
        </div>
        <button type="submit" >ADD</button>
      </form>
    </div>
  )
}

export default Add