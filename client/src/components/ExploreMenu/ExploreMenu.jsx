import { menu_list } from "../../Assets/frontend_assets/assets"
import "./ExploreMenu.css"

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore-menu" id="menu">
        <h1>Explore Our Menu</h1>
        <p className="explore-menu-desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, quibusdam consequuntur? Dignissimos voluptatum sit minima fuga accusamus exercitationem, perferendis nihil ipsam tenetur </p>
        <ul className="explore-menu-list">
        {
            menu_list.map((eachItem)=>(
                <li className="explore-menu-list-items" key={eachItem.menu_name} onClick={()=>setCategory((prev)=>prev === eachItem.menu_name?"All":eachItem.menu_name)}>
                    <img className={category === eachItem.menu_name?"active":''} src={eachItem.menu_image} alt="food Item" />
                    <p>{eachItem.menu_name}</p>
                </li>
            ))
        }
        </ul>
        <hr />
    </div>
  )
}

export default ExploreMenu