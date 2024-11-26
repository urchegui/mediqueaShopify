import "./header.scss";
import { Link } from "react-router-dom";
import logoMediquea from "../../assets/blackLogo.png";
import { useState, useEffect } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { viewPort } from "../../utils/viewPort";
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { useShopifyContext } from "../../services/ShopifyProvider";
import Cart from "../../components/Cart.jsx"

const Header = () => {

  const pathname = useLocation();
  let route = pathname.pathname.substring(1);
  const [isMobile, setIsMobile] = useState(viewPort());
  const { handleCartToggle, state } = useShopifyContext();
  const { cartQuantity } = state;
  const [ numberOfProducts, setNumberOfProducts ] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(viewPort());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    route = pathname.pathname.substring(1);
  }, [pathname]);

  useEffect(() => {
    if(cartQuantity != undefined){
      setNumberOfProducts(cartQuantity);
    }
  }, [cartQuantity])

  const [isOpen, setOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        <nav id={`navbar${route == "" ? "-home" : ""}`}>
          <div className="mobile-logo_wrapper">
          <Link to="/"><img src={logoMediquea} alt="Logo de Mediquea" /></Link>
          </div>
          <div className="right_wrapper">
            <div className="bag" onClick={handleCartToggle}>
                <div className="number-of-products">{numberOfProducts}</div>
                <IoBagOutline />
            </div>
            <div className="hamburger">
              <Hamburger color="#8CC5C7" toggled={isOpen} toggle={setOpen} />
            </div>
          </div>
          <div className={`mobile_menu ${isOpen}`}>
            <Link to="/" onClick={() => setOpen(!isOpen)}>Home</Link>

            <HashLink to={"/#apuntes"} onClick={() => setOpen(!isOpen)}>Apuntes</HashLink>

            <Link to="/multimedia" onClick={() => setOpen(!isOpen)}>Multimedia</Link>

            <Link to="/ankis" onClick={() => setOpen(!isOpen)}>Ankis</Link>

            <Link to="/chatbot" onClick={() => setOpen(!isOpen)}>MIRea</Link>

            <HashLink to='#'
              onClick={(e) => {
                window.location.href = "mailto:mediquea@gmail.com";
                e.preventDefault();
              }}>Contacto</HashLink>
            <div className="social_wrapper"></div>
          </div>
        </nav>
        <Cart />
      </>
    );
  } else {
    return (
      <>
        <nav id={`navbar${route == "" ? "-home" : ""}`}>
          <div className="web-sections">
            <Link to="/">Home</Link>

            <HashLink to={"/#apuntes"}>Apuntes</HashLink>

            <Link to="/multimedia">Multimedia</Link>

            <Link to="/ankis">Ankis</Link>

            <Link to="/chatbot">MIRea</Link>

            <HashLink to='#'
              onClick={(e) => {
                window.location.href = "mailto:mediquea@gmail.com";
                e.preventDefault();
              }}>Contacto</HashLink>
          </div>
          <div className="logo-wrapper_navbar">
            <img
              src={logoMediquea}
              className="navbar-logo"
              alt="Logo de Mediquea"
            />
          </div>
          <div className="socialMediaLogos">
            <Link to="https://www.instagram.com/mediquea/?hl=es"><FaInstagram /></Link>
            <Link to="https://www.youtube.com/channel/UCNWhQt0dOUo49PaMFL6PAiQ"><FaYoutube /></Link>
            <div className="bag" onClick={handleCartToggle}>
              <div className="number-of-products">{numberOfProducts}</div>
              <IoBagOutline />
            </div>
          </div>
        </nav>
        <Cart />
      </>
    );
  }
};
export default Header;
