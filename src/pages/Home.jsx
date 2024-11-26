import HomeBanner from "../components/HomeBanner";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from "@gsap/react";
import diego from "../assets/DiegoDeLaHoz.png";
import nicolas from "../assets/NicoMorato.png";
import { useState } from "react";
import "./home.scss";
import BlogCategory from "../components/BlogCategory";
import { useShopifyContext } from '../services/ShopifyProvider';
import { Link } from "react-router-dom";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Home = () => {
  useGSAP(() => {
    let breakPoint = 800;
    gsap.matchMedia().add({
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`
    }, (context) => {
      let { isDesktop } = context.conditions;
      if (isDesktop) {
        var tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".bannerContainer",
            start: "top",
            end: "+=850",
            scrub: true
            // markers: true
          }
        })
        tl.fromTo(".logo-wrapper_navbar", {
          height: "100dvh"
        },
          {
            height: "100%"

          }).fromTo(".navbar-logo", {
            height: "200px",
          },
            {
              height: "50px",
            }, "-=1")
          .fromTo(".web-sections", {
            width: "40%"
          },
            {
              width: "35%"
            }, "-=1")
      }
    })
  })

  const { state, setState } = useShopifyContext();
  const { categories, loadingCategories } = state;
  return (
    <>
      <HomeBanner />
      <div className="about-us_preview">
        <div className="left-part">
          <img src={diego} id="diego" className="about-us_preview_photo" alt="Diego de la Hoz" />
          <img src={nicolas} id="nicolas" className="about-us_preview_photo" alt="Nicolás Morato" />
        </div>
        <div className="right-part">
          <p className="about-us_preview_text">
            Diego de la Hoz y Nicolás Morato, dos estudiantes de medicina de la Universidad Complutense de Madrid se unen para crear Mediquea.
            Una plataforma cuyo propósito es el de enseñar asignaturas tanto básicas como clínicas, además de contenido teórico y práctico, poniendo a los usuarios a prueba a través de sus casos clínicos y preguntas tipo MIR.
          </p>
          <button><Link to="/about-us">Sobre Mediquea</Link></button>
        </div>
      </div>
      <div id="apuntes" className="categories-wrapper">
        {loadingCategories ? (
          <BlogCategory loaded={loadingCategories} />
          ) : (
            categories.map((category, index) => (
            <BlogCategory key={index} blogData={category} loaded={loadingCategories} />
          ))
        )}
      </div>
    </>
  );
};
export default Home;