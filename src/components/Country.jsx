import React ,{useContext} from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../context/ThemeContext';

const Country = ({ info}) => {

    const { name, population, region, capital, flags: { svg } } = info;
    
    const {isDarkModeExist}=useContext(ThemeContext);

    return (
        <section className={`country-section ${isDarkModeExist ? 'dark-mode' : 'light-mode'}`}>
            <section className="country-flag-section">
                <img src={svg} alt={`${name.common}'s pic`} />
            </section>
            <section className={`country-info-section ${isDarkModeExist ? 'dark-mode' : 'light-mode'}`}>
                <h1>{name.common}</h1>
                <p>Population: <span>{population}</span></p>
                <p>Region: <span>{region}</span></p>
                <p>Capital: <span>{capital}</span></p>
            </section>
        </section>
    )
}

Country.propTypes = {
    info: PropTypes.shape({
        name: PropTypes.object,
        population: PropTypes.number,
        region: PropTypes.string,
        capital: PropTypes.array,
        flags: PropTypes.shape({
            svg: PropTypes.string.isRequired
        })
    })
}

export default Country;

