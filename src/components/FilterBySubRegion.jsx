import React ,{useContext} from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../context/ThemeContext';

const FilterBySubRegion = ({ subRegions, setFilterSubRegionValue}) => {

  const {isDarkModeExist}=useContext(ThemeContext);

  return (
    <>
      <section className={`filter-section ${isDarkModeExist ? 'dark-mode' : 'light-mode'}`} >
        <select onChange={(e) => setFilterSubRegionValue(e.target.value)} className={isDarkModeExist ? 'dark-mode' : 'light-mode'} >
          <option value="">Filter by Sub Region</option>
          {subRegions.map((subRegion) => (
            <option value={subRegion} key={subRegion} >{subRegion.toUpperCase()}</option>
          ))}
        </select>
      </section>
    </>
  )
}

FilterBySubRegion.propTypes = {
  subRegions: PropTypes.array,
  setFilterSubRegionValue: PropTypes.func,
}

export default FilterBySubRegion;