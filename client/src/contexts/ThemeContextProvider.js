
import React from "react";
import useLocalStorageHook from "../hooks/useLocalStorageHook";
const ThemeContext = React.createContext(null);
const useTheme = () => {
  
    const [mode, setMode] = React.useContext(ThemeContext);
  
    const handleMode = (value) => {
        setMode(value);
    };
  
    return { value: mode, onChange: handleMode };
  };
const ThemeContextProvider = ({ children }) => {
  
    const [mode, setMode] = useLocalStorageHook("mode", "light");
    return (
      <ThemeContext.Provider value={[mode,setMode]}>
        {children}
      </ThemeContext.Provider>
    );
  };
export { ThemeContextProvider, ThemeContext , useTheme};