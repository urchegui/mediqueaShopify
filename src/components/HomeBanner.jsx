import "./HomeBanner.scss";
import { useState, useEffect } from "react";
import { viewPort } from "../utils/viewPort";
import drawing from "../assets/drawing.svg"

const HomeBanner = () => {
  const [isMobile, setIsMobile] = useState(viewPort());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(viewPort());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let render = null;
  if (isMobile) {
    render = 
    <div className="mobile-banner_wrapper">
      <div className="text">
        <h3>Lo importante es <br /><span>APRENDER</span>.</h3>
      </div>
      <div className="drawing">
        <img src={drawing} alt="Mediquea dibujo" />
      </div>
    </div>
  }
  return (
    <>
      <div className="bannerContainer">{render}</div>
    </>
  );
};

export default HomeBanner;
