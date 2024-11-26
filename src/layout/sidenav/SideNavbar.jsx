import MultimediaSideNav from "./MultimediaSideNav";
import AnkisSideNav from "./AnkisSideNav";

const SideNavbar = (props) => {
  const { route, show } = props;

  if (route !== "multimedia" && route !== "ankis") {
    return null; 
  }

  return (
    <div className={`sidenavbar ${show}`}>
      {route === "multimedia" ? (
        <MultimediaSideNav {...props} />
      ) : (
        <AnkisSideNav {...props} />
      )}
    </div>
  );
};

export default SideNavbar;
