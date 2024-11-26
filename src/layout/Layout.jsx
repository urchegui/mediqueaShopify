import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import SideNavbar from "./sidenav/SideNavbar";
import { useSelectedOption } from '../services/SelectedOptionContext';

const Layout = () => {
  const location = useLocation();
  const route = location.pathname.substring(1);
  const { selectedOption, setSelectedOption } = useSelectedOption();

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const shouldShowSideNavbar = route === "multimedia" || route === "ankis";

  return (
    <>
      <Header />
      {shouldShowSideNavbar && (
        <SideNavbar
          onSelectOption={handleOptionChange}
          show={shouldShowSideNavbar ? "show" : "hide"}
          route={route}
        />
      )}
      <main>
        <Outlet context={selectedOption} />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
