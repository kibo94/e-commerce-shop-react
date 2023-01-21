import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScreenMode from "../../components/screenMode/ScreenMode";



import { HeaderProps } from "../../models/HeaderProps";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Nav from "../../components/nav/Nav";
export const Header = ({
  authUser,
  admin,
  logoutUser,
  online,
  cart,
}: HeaderProps) => {
  let headerColor = "orange";
  if (admin) {
    headerColor = "blue";
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //   const {data , isLoading} = useQuery("laptops", useFetchItems2(),{
  //     staleTime:6000
  //   });

  // if(isLoading) {}
  const toggleBurgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  let headerClass = "";
  if (isMenuOpen) {
    headerClass = "active";
  }

  function shopingCart(cartClass:string) {
    if (!admin)
      return (
        <Link
          onClick={() => setIsMenuOpen(false)}
          to="/cart"
          className={`cartLink ${cartClass}`}
        >
          <span>{cart.length}</span>
          <ShoppingCartIcon className="cart" />
        </Link>
      );
    return null;
  }
  return (
    <>
      <header className={headerClass} style={{ backgroundColor: headerColor }}>
        {/* <StopWatch seconds={seconds} miliseconds={miliseconds} minutes={minutes} /> */}
        <div className="burger" onClick={toggleBurgerMenu}>
          <MenuIcon className="burgerIcon" />
        </div>
        <ScreenMode classNamee={"mobile"} />
        {shopingCart("mobile")}

        <div className="border"></div>
        <Nav admin={admin} setIsMenuOpen={setIsMenuOpen} authUser={authUser} shopingCart={shopingCart} logoutUser={logoutUser}/>
        
        {/* <h1>ITEMS{data?.data.length}</h1> */}
      </header>
    </>
  );
};

