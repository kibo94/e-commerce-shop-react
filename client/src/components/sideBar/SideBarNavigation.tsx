import React from 'react'
import { Link } from 'react-router-dom'
import { useSideBar } from '../../contexts/SideBarContext';
import LogoutIcon from "@mui/icons-material/Logout";
import Profile from '../profile/Profile';
import "./Sidebar.scss"

function SideBarNavigation({admin,authUser, logoutUser}:any) {
    const { toggle, isSideBarOpen } = useSideBar();
  return (
    <div className="leftLinks">
    <Link onClick={() => toggle(null,false)} to="/">
      Home
    </Link>
    
    {!admin ? (
      <>
        <Link onClick={() => toggle(null,false)} to="/fruits">
          Fruits
        </Link>
        <Link onClick={() => toggle(null,false)} to="/vegetables">
          Vegetables
        </Link>
        <Link onClick={() => toggle(null,false)} to="/laptops">
          Laptops 
        </Link>
        <Link to="/contact" onClick={() => toggle(null,false)}>
          Contact
        </Link>
      </>
    ) : (
      <>
        <Link onClick={() => toggle(null,false)} to="/addItem">
          AddItem
        </Link>

        <Link onClick={() => toggle(null,false)} to="/items">
          Items
        </Link>
      </>
    )}

       <div className="auth">
        {!authUser.userName ? (
          <>
            <Link onClick={() =>toggle(null,false)} to="/login">
              Login
            </Link>
            <Link onClick={() => toggle(null,false)} to="/register">
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
              color="secondary"
              onClick={() => {
                toggle(null,false)
                logoutUser()
              }}
            >
              Logout
            </LogoutIcon>

            {/* <UserStatus userStatus={online} /> */}
          </div>
        )}
        </div>
  </div>
  )
}

export default SideBarNavigation