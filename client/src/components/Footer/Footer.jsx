import { assets } from "../../Assets/frontend_assets/assets"
import "./Footer.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <div className='footer' id="footer">
        <div className="footer-content">
            <div className="footer-left">
                <img src={assets.logo} alt="logo" />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum optio debitis, omnis aperiam libero blanditiis tempore odit, dolorem labore sunt quidem recusandae vel. Sint fugiat veritatis recusandae quidem tempora voluptates!</p>
                <div className="footer-icons-container">
                    <InstagramIcon className="footer-icon"/>
                    <FacebookIcon className="footer-icon"/>
                    <TwitterIcon className="footer-icon"/>
                </div>
            </div>
            <div className="footer-middle">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-738994723</li>
                    <li>contact@spicy.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p>Copyright 2024 @ All rights reserved</p>
    </div>
  )
}

export default Footer