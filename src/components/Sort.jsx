import React, { useContext } from "react";
import PropTypes, { func } from "prop-types";
import ThemeContext from "../context/ThemeContext";

const Sort = ({ setSortType, setSortOrder }) => {
  const { isDarkModeExist } = useContext(ThemeContext);

  function findSortOrder(e) {
    setSortOrder(e.target.value);
  }
  function findSortType(e) {
    setSortType(e.target.value);
  }

  const styleObj={
    color:isDarkModeExist?'white':'hsl(200, 15%, 8%)'
  }
  
  return (
    <>
      <section className="sort-countries-section" >
        <h1 style={styleObj}>SORT BY : </h1>

        <section
          className={`filter-section ${
            isDarkModeExist ? "dark-mode" : "light-mode"
          }`}
        >
          <select
            onChange={(e) => findSortType(e)}
            className={isDarkModeExist ? "dark-mode" : "light-mode"}
          >
            <option value="">Sort Type</option>
            <option value="area">Area</option>
            <option value="population">Population</option>
          </select>
        </section>

        <section
          className={`filter-section ${
            isDarkModeExist ? "dark-mode" : "light-mode"
          }`}
        >
          <select
            onChange={(e) => findSortOrder(e)}
            className={isDarkModeExist ? "dark-mode" : "light-mode"}
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </section>
      </section>
    </>
  );
};

Sort.propTypes = {
  setSortType: PropTypes.func,
  setSortOrder: PropTypes.func,
};

export default Sort;
