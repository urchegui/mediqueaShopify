
import diego from "../assets/DiegoDeLaHoz.png";
import nicolas from "../assets/NicoMorato.png";
import "./aboutus.scss"
import { useEffect } from "react";

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, []);

    return (
        <>
            <div className="about-us_wrapper">
                <div className="left-part">
                    <img src={diego} id="diego" className="about-us_preview_photo" alt="Diego de la Hoz" />
                    <img src={nicolas} id="nicolas" className="about-us_preview_photo" alt="Nicolás Morato" />
                </div>
                <div className="right-part">
                    <h3>Mediquea es una iniciativa diseñada con el propósito de ofrecer contenido científico de interés para estudiantes y profesionales de la Salud.
                    </h3>
                    <p className="about-us_preview_text">
                        Os damos la bienvenida a @mediquea , una iniciativa que hemos diseñado con el propósito de ofrecer contenido científico de interés para estudiantes y profesionales de la Salud. Cada semana subiremos en nuestro Instagram varias publicaciones encuadradas en diferentes grupos temáticos. Podréis encontrar contenido teórico como esquemas, resúmenes, reglas mnemotécnicas…, y práctico como casos clínicos y preguntas tipo MIR para poner a prueba vuestro conocimiento. Nuestra idea no solo es formativa; también queremos estimular la interacción entre estudiantes y profesionales de la Salud. Esperamos que os guste nuestro contenido. Si es así, ¡síguenos y comparte!                    </p>
                </div>
            </div>
        </>
    );
}

export default AboutUs;