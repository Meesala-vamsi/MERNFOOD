import { assets } from "../../Assets/frontend_assets/assets"
import "./MobileApp.css"

const MobileApp = () => {
  return (
    <div className="mobile-app" id="mobile-app">
        <h1>For Better Experience Download <br/> Tomato App</h1>
        <div className="store-container">
            <img src={assets.play_store} alt="playstore" />
            <img src={assets.app_store} alt="appstore" />
        </div>
    </div>
  )
}

export default MobileApp