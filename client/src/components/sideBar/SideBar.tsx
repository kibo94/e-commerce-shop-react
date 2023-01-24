import React, { Component } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useSideBar } from "../../contexts/SideBarContext";
interface SideBarProps {
  isOpenProfleModal: any;
}
function SideBar({  isOpenProfleModal}: SideBarProps) {
  const { toggle, isSideBarOpen } = useSideBar();
 
 
  let profilModalClass = "profileModal";
  if (isSideBarOpen.open) {
    profilModalClass = "profileModal open";
  } else {
    profilModalClass = "profileModal";
  }
  console.log(profilModalClass)
  return (
    <div className={profilModalClass}>
      <div
        className="overlay"
        onClick={() => {
          toggle(null,false)
        }}
      ></div>
      <div className="content">
        <ClearIcon onClick={ () =>   toggle(null,false)}/>
       {isSideBarOpen.children}
      </div>
    </div>
  );
}

export default SideBar;
