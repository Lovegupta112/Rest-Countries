import React ,{useContext} from 'react';
import { HiOutlineMoon } from 'react-icons/hi2';
import { BsMoonFill } from 'react-icons/bs';
import ThemeContext from '../context/ThemeContext';


const Header = () => {

    const {isDarkModeExist,setIsDarkModeExist}=useContext(ThemeContext);

    const changeMode = () => {
        setIsDarkModeExist((isDarkModeExist) => isDarkModeExist ? false : true);
        localStorage.setItem('theme',isDarkModeExist?false:true);
    }

    return (
        <header className={isDarkModeExist ? 'dark-mode' : 'light-mode'}>
            <h1>Where in the world? </h1>
            <section className="dark-mode-section" onClick={changeMode}>
                {isDarkModeExist ? <BsMoonFill id='moon' />
                    : <HiOutlineMoon id='moon' />
                }
                <p>Dark Mode</p>
            </section>
        </header>
    )
}

export default Header;