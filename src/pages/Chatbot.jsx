import "./chatbot.scss";
import { useEffect } from "react";
const Chatbot = () =>{
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.dattabot.es/widget/widget.js";
        script.async = true;
        document.head.appendChild(script);
    
        return () => {
          document.head.removeChild(script); // Limpieza al desmontar el componente
        };
      }, []);
    return(
        <>
            <div className="chatbot-wrapper">
                <div id="dtt_widgetdattabot" data-cod="10f17b5800183b5b59910c20504ef0a0" data-style="dattabot"></div> 
            </div>
        </>
    )
}

export default Chatbot;