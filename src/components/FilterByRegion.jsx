import React ,{useContext} from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../context/ThemeContext';

const FilterByRegion = ({ regions, setFilterRegionValue ,findSubRegions ,setFilterSubRegionValue}) => {

  const {isDarkModeExist}=useContext(ThemeContext);

 function findRegions(e){
  setFilterRegionValue(e.target.value);
  setFilterSubRegionValue('');
  findSubRegions(e.target.value);
 }
  
  return (
    <>
      <section className={`filter-section ${isDarkModeExist ? 'dark-mode' : 'light-mode'}`} >
        <select onChange={(e) => findRegions(e)} className={isDarkModeExist ? 'dark-mode' : 'light-mode'} >
          <option value="">Filter by Region</option>
          {regions.map((region) => (
            <option value={region} key={region} >{region.toUpperCase()}</option>
          ))}
        </select>
      </section>
    </>
  )
}

FilterByRegion.propTypes = {
  regions: PropTypes.array,
  setFilterRegionValue: PropTypes.func,
}

export default FilterByRegion;