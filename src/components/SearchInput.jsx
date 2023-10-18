import React ,{useContext} from 'react';
import PropTypes from 'prop-types';
import { BiSearchAlt2 } from 'react-icons/bi';
import ThemeContext from '../context/ThemeContext';

const SearchInput = ({ inputValue, setInputValue}) => {

    const {isDarkModeExist}=useContext(ThemeContext);

    return (
        <section className={`search-section ${isDarkModeExist ? 'dark-mode' : 'light-mode'}`}>
            <BiSearchAlt2 className='search-logo' />
            <input type="text" placeholder='Search for a country...' value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                className={isDarkModeExist ? 'dark-mode' : ''} />
        </section>
    )
}

SearchInput.propTypes = {
    inputValue: PropTypes.string,
    setInputValue: PropTypes.func,
}
export default SearchInput;
