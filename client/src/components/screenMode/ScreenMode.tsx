import React from "react";
import { useTheme } from "../../contexts/ThemeContextProvider";
import { getMode, setModeValue } from "../../utils/utils";
import "./ScreenMode.scss"

function ScreenMode({classNamee}:any) {
  const { value, onChange } = useTheme();
  let toogleClass = `toggleMode ${getMode(value)} ${classNamee}`;

  const changeModeHandler = () => {
    onChange(setModeValue(value));
  };
  return (
    <div className="mode">
      <div className={toogleClass} onClick={changeModeHandler}></div>
    </div>
  );
}

export default ScreenMode;
