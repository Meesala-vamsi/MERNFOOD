import "./Header.css"
import {assets} from "../.././Assets/frontend_assets/assets"

const Header = () => {
  return (
    <div className='header-container' id="home">
        <div className="header-content">
            <h2>Order your favourite food here</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sit nesciunt exercitationem, illo explicabo expedita eos eligendi repellendus aspernatur porro nam neque ipsam, nemo quod distinctio, fuga laudantium maiores id.</p>
            <button>View Menu</button>
        </div>
    </div>
  )
}

export default Header