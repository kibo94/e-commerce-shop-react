import React, { useState } from "react";

const SideBarContext = React.createContext(null);
const defaultSideBar = {
    open:false,
    children:null
}



const useSideBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = React.useContext(SideBarContext);
  const toggleSideBar = (children,open) => {
  
    setIsSideBarOpen({...isSideBarOpen,open:open,children:children})

  }
  return {isSideBarOpen:isSideBarOpen,toggle:toggleSideBar}
}


const SideBarContextProvider = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(defaultSideBar);
  return (
    <SideBarContext.Provider value={[isSideBarOpen, setIsSideBarOpen]}>
      {children}
    </SideBarContext.Provider>
  );
};
export { SideBarContextProvider, SideBarContext, useSideBar };
