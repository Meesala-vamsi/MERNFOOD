import { useContext } from "react"
import "./FoodList.css"
import { Context } from "../../ReactContext/Context"
import FoodItems from "../FoodItems/FoodItems"


const FoodList = ({category}) => {
    const {food_list} = useContext(Context)

  return (
    <div className="food-list">
        <h2>Top Dishes For you</h2>
        <ul className="food-list-container">
            {
                food_list.map((eachItem,index)=>{
                    if(category === "All" || category === eachItem.category){
                    return <li key={index}>
                        <FoodItems item = {eachItem}/>
                    </li>
                    }
})
            }
        </ul>
    </div>
  )
}

export default FoodList