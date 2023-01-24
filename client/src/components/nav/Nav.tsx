import React, { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import LaptopIcon from "@mui/icons-material/Laptop";
import ScreenMode from "../screenMode/ScreenMode";

import "./Nav.scss";
import Profile from "../profile/Profile";
import SideBar from "../sideBar/SideBar";
import { useSideBar } from "../../contexts/SideBarContext";
function Nav({ admin, setIsMenuOpen, authUser, shopingCart, logoutUser }: any) {
  const { toggle, isSideBarOpen } = useSideBar();

  const [isOpenProfleModal, setIsOpenProfileModal] = useState(false);
  // function toggleProfileModal() {
  //   setIsOpenProfileModal(!isOpenProfleModal);
  // }

  // useEffect(() => {

  // },)
 
  return (
    <nav>
      {/* <div className={profilModalClass}>
          <div className="overlay" onClick={() => setIsOpenProfileModal(!isOpenProfleModal)}></div>
          <div className="content" >
          <ClearIcon
            onClick={() => setIsOpenProfileModal(!isOpenProfleModal)}
          />
          <Profile user={authUser}/>
          </div>
        </div> */}
     
   
    

      <div>
        <div className="leftLinks">
          <Link onClick={() => setIsMenuOpen(false)} to="/">
            Home
          </Link>
          
          {!admin ? (
            <>
              <Link onClick={() => setIsMenuOpen(false)} to="/fruits">
                Fruits
              </Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/vegetables">
                Vegetables
              </Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/laptops">
                Laptops <LaptopIcon />
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </>
          ) : (
            <>
              <Link onClick={() => setIsMenuOpen(false)} to="/addItem">
                AddItem
              </Link>

              <Link onClick={() => setIsMenuOpen(false)} to="/items">
                Items
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="auth">
        {!authUser.userName ? (
          <>
            <Link onClick={() => setIsMenuOpen(false)} to="/login">
              Login
            </Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/register">
              Register
            </Link>
          </>
        ) : (
          <div className="logout">
            <div className="user" onClick={() => toggle(<Profile user={authUser}/>,true)}>
              {authUser.userName[0]}
              {/* <PersonIcon /> {authUser.userName} */}
            </div>
            <LogoutIcon
              color="primary"
              onClick={() => {
                logoutUser();
                setIsMenuOpen(false);
              }}
            >
              Logout
            </LogoutIcon>

            {/* <UserStatus userStatus={online} /> */}
          </div>
        )}
        <ScreenMode classNamee={"desktop"} />
        <>{shopingCart("desktop")}</>
      </div>
    </nav>
  );
}

export default Nav;
