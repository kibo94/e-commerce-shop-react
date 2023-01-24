import React, { useState } from "react";
const PopupContext = React.createContext(null);
const SideBarContext = React.createContext(null);
const defaultPopUp = {
  display: false,
  type: "default",
  message: "",
  delay:1000,
  top:300

};


const usePopUp =  () =>  {
  const [popUp, setPopUp] = React.useContext(PopupContext);
  
  const handlePopUp = async (value) =>  {
     await setPopUp({...popUp,...value,  display:true,});
      setTimeout(() => {
          setPopUp(defaultPopUp);
        }, value.delay);
   
  };
  const handleClose = () => {
     setPopUp(defaultPopUp)
  }

  return { popUp: popUp, onChange: handlePopUp , onClose:handleClose};
};


const PopupContextProvider = ({ children }) => {
  const [popUp, setPopUp] = useState(defaultPopUp);
  return (
    <PopupContext.Provider value={[popUp, setPopUp]}>
      {children}
    </PopupContext.Provider>
  );
};
export { PopupContextProvider, PopupContext, usePopUp };
