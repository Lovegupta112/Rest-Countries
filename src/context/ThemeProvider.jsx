import React ,{useState} from 'react';
import ThemeContext from './ThemeContext';


const ThemeProvider=(props)=>{


    const [isDarkModeExist, setIsDarkModeExist] = useState(JSON.parse(localStorage.getItem('theme'))|| false);

    
    return (
        <>
        <ThemeContext.Provider
        value={{
            isDarkModeExist,
            setIsDarkModeExist
        }}
        >
         {props.children}
        </ThemeContext.Provider>
        </>
    )
}

export default ThemeProvider;