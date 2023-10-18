import { useState, useEffect, useContext } from "react";
import axios from "axios";

import ThemeContext from "../context/ThemeContext";
import Country from "../components/Country";
import Loader from "../components/Loader";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import FilterByRegion from "../components/FilterByRegion";
import FilterBySubRegion from "../components/FilterBySubRegion";
import Sort from "../components/Sort";

function Homepage() {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [regions, setRegions] = useState([]);
  const [filterRegionValue, setFilterRegionValue] = useState("");
  const [isFetchedCountries, setIsFetchedCountries] = useState(true); //change name of this like isCountries fetched -
  const [subRegions, setSubRegions] = useState([]);
  const [filterSubRegionValue, setFilterSubRegionValue] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [sortType, setSortType] = useState("");

  const { isDarkModeExist } = useContext(ThemeContext);

  useEffect(() => {
    setTimeout(() => {
      fetchCountries();
    }, 3000);
  }, []);

  // for fetch all countries ----------

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setIsFetchedCountries(false);
      setCountries(response.data);
      findRegion(response.data);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  // for finding countries based on filter , search ------------

  let filteredCountries = countries
    .filter((country) => country.region.includes(filterRegionValue))
    .filter((country) => country.subregion?.includes(filterSubRegionValue))
    .filter((country) =>
      country.name.common.toLowerCase().includes(inputValue.toLowerCase())
    );

  // sort based on sort type and sort order ------------
  if (sortType) {
    filteredCountries = filteredCountries.sort((a, b) => {
      if (sortType === "area") {
        return sortOrder === "ascending" ? a.area - b.area : b.area - b.area;
      } else {
        return sortOrder === "ascending"
          ? a.population - b.population
          : b.population - a.population;
      }
    });
  }

  // for finding unique region --------
  function findRegion(countries) {
    const totalRegion = countries.reduce((totalRegion, country) => {
      const { region } = country;
      totalRegion.add(region);
      return totalRegion;
    }, new Set());
    setRegions([...totalRegion]);
  }
  // for finding unique subregion of particular region ----
  function findSubRegions(region) {
    const totalSubRegion = [
      ...new Set(
        countries
          .filter((country) => {
            if (country.subregion == undefined) {
              country.subregion = "";
            }
            return country.region === region && country.subregion;
          })
          .map((country) => country.subregion)
      ),
    ];
    setSubRegions(totalSubRegion);
  }

  //for loader -----------------
  if (isFetchedCountries) {
    return <Loader />;
  }


  return (
    <>
      <section
        className={`container ${
          isDarkModeExist ? "background-dark-mode" : "background-light-mode"
        }`}
      >
        <main>
          {/*------------------ filter section ------------- */}
          <section className="search-filter-section">
            <SearchInput
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
            {countries && (
              <FilterByRegion
                regions={regions}
                setFilterRegionValue={setFilterRegionValue}
                findSubRegions={findSubRegions}
                setFilterSubRegionValue={setFilterSubRegionValue}
              />
            )}
            {regions && (
              <FilterBySubRegion
                subRegions={subRegions}
                setFilterSubRegionValue={setFilterSubRegionValue}
              />
            )}
          </section>

          {/* -------------sort section ---------------------- */}
          {countries && (
            <Sort setSortType={setSortType} setSortOrder={setSortOrder} />
          )}

          {/* ----------------flags container ---------------------- */}
          {filteredCountries.length > 0 ? (
            <section className="flags-container">
              {countries &&
                filteredCountries.map((country) => (
                  <Country info={country} key={country.name.common} />
                ))}
            </section>
          ) : (
            <h1 className="not-found">No such countries found</h1>
          )}
        </main>
      </section>
    </>
  );
}

export default Homepage;
