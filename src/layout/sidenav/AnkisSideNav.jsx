/* eslint-disable react/prop-types */
import "../../components/sidenavbar.scss";
import ankiIcon from "../../assets/Anki-icon.png"
import Button from "../../components/Button";
import { useState } from "react";
import { useEffect } from "react";

const AnkisSideNav = (props) => {
  const [activeButton, setActiveButton] = useState("grado");

  const handleButtonClick = async (buttonType) => {
    setActiveButton(buttonType);
    if (buttonType === 'grado') {
      props.onSelectOption("Ankis Grado");
    }
    if (buttonType === 'MIR') {
      props.onSelectOption("Ankis MIR");
    }
  };

  useEffect(() => {
    props.onSelectOption("Ankis Grado");
  }, [])

  return (
    <>
      <div className="multimedia_menu">
        <ul>
          <li onClick={() => handleButtonClick("grado")}>
            <Button
              isActive={activeButton === "grado"}
              image={ankiIcon}
              text="Ankis Grado"
            />
          </li>
          <li onClick={() => handleButtonClick("MIR")}>
            <Button
              isActive={activeButton === "MIR"}
              image={ankiIcon}
              text="Ankis MIR"
            />
          </li>
        </ul>
      </div>
    </>
  );
};
export default AnkisSideNav;
