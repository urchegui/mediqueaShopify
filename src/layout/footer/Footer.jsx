import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import logoMediquea from "../../assets/blackLogo.png";

import "./footer.scss";

const Footer = () => {

  return (
    <>
      <div className="footer">
        <div className="link-row">
          <Link to="/">Home</Link>

          <HashLink to={"/#apuntes"}>Apuntes</HashLink>

          <Link to="/multimedia">Multimedia</Link>

          <Link to="/ankis">Ankis</Link>

          <HashLink to='#'
            onClick={(e) => {
              window.location.href = "mailto:mediquea@gmail.com";
              e.preventDefault();
            }}>Contacto</HashLink>

            <Link to="/info">+info</Link>
        </div>
      </div>
    </>
  )
}

export default Footer
