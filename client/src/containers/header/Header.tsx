import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScreenMode from "../../components/screenMode/ScreenMode";
import LaptopIcon from "@mui/icons-material/Laptop";
import PersonIcon from "@mui/icons-material/Person";
import UserStatus from "../../components/userStatus/UserStatus";
import { HeaderProps } from "../../models/HeaderProps";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
export const Header = ({
  authUser,
  admin,
  logoutUser,
  online,
  cart
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
  let cartWithQuantity = [];
  if(cart.length > 0) {
    cartWithQuantity = cart.filter(c => c.quantity > 0)
  }
  
  return (
    <>
    <header className={headerClass} style={{ backgroundColor: headerColor }}>
      {/* <StopWatch seconds={seconds} miliseconds={miliseconds} minutes={minutes} /> */}
      <div className="burger" onClick={toggleBurgerMenu}>
        <MenuIcon className="burgerIcon" />
      </div>
      <Link onClick={() => setIsMenuOpen(false)} to="/cart" className="cartLink mobile">
            <span>{cartWithQuantity.length}</span>
            <ShoppingCartIcon className="cart" />
          </Link>
      <div className="border"></div>
      <nav>
        <div>
          {admin ? (
            <div className="leftLinks">
              <Link onClick={() => setIsMenuOpen(false)} to="/addItem">
                AddItem
              </Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/items">
                Items
              </Link>
            </div>
          ) : (
            <div className="leftLinks">
              <Link onClick={() => setIsMenuOpen(false)} to="/home">
                Home
              </Link>
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
            </div>
          )}
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
          ) : null}
          <ScreenMode />
          <Link onClick={() => setIsMenuOpen(false)} to="/cart" className="cartLink dekstop">
            <span>{cartWithQuantity.length}</span>
            <ShoppingCartIcon className="cart" />
          </Link>
         
        </div>

        {authUser.userName ? (
          <div className="logout">
            <h3>
              <PersonIcon /> {authUser.userName}
            </h3>
            <button
              onClick={() => {
                logoutUser();
                setIsMenuOpen(false);
              }}
            >
              Logout
            </button>

            <UserStatus userStatus={online} />
          </div>
        ) : null}
      </nav>
      {/* <h1>ITEMS{data?.data.length}</h1> */}
    </header>
   
    </>
  );
};

const useFetchItems2 = () => {
  // const [items, setItems] = useState<ItemModel[]>([]);
  const fetchItems = useCallback(async () => {
    const data = await axios.get(`/laptops}`);
    return data;
    // setItems(data.data);
  }, []);
  useEffect(() => {
    // setItems([]);
    fetchItems();
  }, [fetchItems]);
  return fetchItems;
};
