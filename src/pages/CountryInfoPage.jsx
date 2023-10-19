import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import { BsArrowLeft } from "react-icons/bs";
import Loader from "../components/Loader";

const CountryInfoPage = () => {
  const [countryInfo, setCountryInfo] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();
  const { isDarkModeExist } = useContext(ThemeContext);

  useEffect(() => {    
      setTimeout(() => {
        getCountryInfo(id);
        getAllCountryInfo();
      }, 1000);
      }, [id]);

  async function getAllCountryInfo() {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
      setError(false);
      setLoader(false);
    } catch (error) {
      setError(true);
      setLoader(false);
      console.log("Error: ", error);
    }
  }

  async function getCountryInfo(id) {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${id}`
      );
      setCountryInfo(...response.data);
      setError(false);
    } catch (error) {
      setError(true);
      console.log("Error: ", error);
    }
    setLoader(false);
  }
  function backToHomePage() {
    navigate("/");
  }

  function visitBorderCountry(e) {
    if (e.target.nodeName === "BUTTON") {
      const id = e.target.dataset.cca3;
      navigate(`/country/${id}`);
       setLoader(true);
      setTimeout(() => {
        getCountryInfo(id);
      }, 1000);
    }
  }

  function mapToCorrespondingName(borderCountry) {
    return countries
      .filter((country) => country?.cca3.includes(borderCountry))
      .map((country) => country.name.common);
  }

  const {
    name,
    population,
    flags,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = countryInfo;

  //for loader -----------------
  if (loader) {
    return <section
    className={`container ${
      isDarkModeExist ? "background-dark-mode" : "background-light-mode"
    }`}
  >
  <Loader />
  </section>
  }

  // if api throw error while fetching countries data ---------
  if (error) {
    return (
      <section
        className={`container ${
          isDarkModeExist ? "background-dark-mode" : "background-light-mode"
        }`}
      >
        <h1 className="country-api-error">
          "Apologies, there seems to be an issue retrieving the country data.
          <br /> Please try again later."
        </h1>
      </section>
    );
  }

  return (
    <main
      className={`container ${
        isDarkModeExist ? "background-dark-mode" : "background-light-mode"
      }`}
    >
      {loader ? (
        <Loader />
      ) : (
        <>
          <button
            className={`back-to-home-section ${
              isDarkModeExist ? "dark-mode" : "light-mode"
            }`}
            onClick={backToHomePage}
          >
            <BsArrowLeft /> &nbsp; Back
          </button>
          <div className="country-page-section">
            <div className="image-section">
              <img src={flags?.svg} alt={`${name?.common}-flag`} />
            </div>
            <div className="country-info-page-section">
              <h1>{name?.common}</h1>
              <div className="country-details">
                <div className="left-section">
                  <p>
                    <span>Native Name: </span>
                    {name && Object.values(name.nativeName)[0].common}
                  </p>
                  <p>
                    <span>Population: </span>
                    {population?.toLocaleString()}
                  </p>
                  <p>
                    <span>Region: </span>
                    {region}
                  </p>
                  <p>
                    <span>Sub Region: </span>
                    {subregion}
                  </p>
                  <p>
                    <span>Captial: </span>
                    {capital}
                  </p>
                </div>
                <div className="right-section">
                  <p>
                    <span>Top Level Domain:</span>
                    {tld}
                  </p>
                  <p>
                    <span>Currencies:</span>
                    {currencies && Object.values(currencies)[0].name}
                  </p>
                  <p>
                    <span>Languages:</span>
                    {languages && Object.values(languages)}
                  </p>
                </div>
              </div>
              <div className="border-countries">
                {/* map borders------- */}
                <span>Border Countries: </span>
                <div className="borders" onClick={(e) => visitBorderCountry(e)}>
                  {borders ? (
                    borders.map((borderCountry) => (
                      <button
                        key={borderCountry}
                        data-cca3={borderCountry}
                        className={`${
                          isDarkModeExist ? "dark-mode" : "light-mode"
                        }`}
                      >
                        {mapToCorrespondingName(borderCountry)}
                      </button>
                    ))
                  ) : (
                    <h1>Not Available</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default CountryInfoPage;

