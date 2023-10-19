import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import { BsArrowLeft } from "react-icons/bs";

const NoMatchPage = () => {
  const { isDarkModeExist } = useContext(ThemeContext);
  const navigate = useNavigate();

  function backToHomePage() {
    navigate("/");
  }

  return (
    <section
      className={`container page-not-found-section ${
        isDarkModeExist ? "background-dark-mode" : "background-light-mode"
      }`}
    >
      <h1 className="page-not-found-heading">
        "Sorry, the page you're looking for cannot be found. 
        <br />
        Please check the
        URL or navigate back to the homepage."
      </h1>
      <button
        className={`back-to-home-section ${
          isDarkModeExist ? "dark-mode" : "light-mode"
        }`}
        onClick={backToHomePage}
      >
        <BsArrowLeft /> &nbsp; Back
      </button>
    </section>
  );
};

export default NoMatchPage;

//todo: make good ui of this page for better user experience ---------
