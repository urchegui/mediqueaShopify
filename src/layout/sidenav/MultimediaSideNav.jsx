/* eslint-disable react/prop-types */
import "../../components/sidenavbar.scss";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import getSeason from "../../utils/SpotifyAPI";
import data from "../../utils/youtubeVideos.json"

const MultimediaSideNav = ({ onSelectOption }) => {
  const [activeButton, setActiveButton] = useState("spotify");

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  useEffect(() => {
    const fetchSeasonData = async () => {
      if (activeButton === "spotify") {
        const seasonData = await getSeason(8, 0, "season1");
        onSelectOption(seasonData);
      } else {
        onSelectOption(data)
      }
    };
    
    fetchSeasonData();
  }, [activeButton]);

  return (
    <div className="multimedia_menu">
      <ul>
        <li onClick={() => handleButtonClick("youtube")}>
          <Button
            isActive={activeButton === "youtube"}
            icon={<FaYoutube />}
            text="YouTube"
          />
        </li>
        <li onClick={() => handleButtonClick("spotify")}>
          <Button
            isActive={activeButton === "spotify"}
            icon={<FaSpotify />}
            text="Spotify"
          />
        </li>
      </ul>
    </div>
  );
};

export default MultimediaSideNav;
