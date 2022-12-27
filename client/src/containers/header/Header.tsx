import React , {useCallback,useEffect} from "react";
import { Link } from "react-router-dom";
import ScreenMode from "../../components/screenMode/ScreenMode";
import LaptopIcon from "@mui/icons-material/Laptop";
import PersonIcon from "@mui/icons-material/Person";
import UserStatus from "../../components/userStatus/UserStatus";
import { HeaderProps } from "../../models/HeaderProps";
import { useQuery } from "react-query";
import axios from "axios";

export const Header = ({
  authUser,
  admin,
  logoutUser,
  online,
}: HeaderProps) => {
  let headerColor = "orange";
  if (admin) {
    headerColor = "blue";
  }
//   const {data , isLoading} = useQuery("laptops", useFetchItems2(),{
//     staleTime:6000
//   });

// if(isLoading) {}
  return (
    <header style={{ backgroundColor: headerColor }}>

      {/* <StopWatch seconds={seconds} miliseconds={miliseconds} minutes={minutes} /> */}
      <nav>
        <div>
    
          {admin ? (
            <>
              <Link to="/addItem">AddItem</Link>
              <Link to="/items">Items</Link>
            </>
          ) : (
            <>
              <Link to="/home">Home</Link>
              <Link to="/fruits">
                Fruits
                <img
                  data-https
                  alt="headerImage"
                  src={
                    "http://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                  }
                  width={30}
                  height={30}
                />
              </Link>
              <Link to="/vegetables">Vegetables</Link>
              <Link to="/laptops">
                Laptops <LaptopIcon />
              </Link>
            </>
          )}
              <Link to="/contact">Contact</Link>
        </div>
        {!authUser.userName ? (
          <div className="auth">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        ) : null}
        {authUser.userName ? (
          <div className="logout">
            <h3>
              <PersonIcon /> {authUser.userName}
            </h3>
            <button onClick={logoutUser}>
              <Link to="/register">Logout</Link>
            </button>
            <ScreenMode />
            <UserStatus userStatus={online} />
          </div>
        ) : null}
      </nav>
      {/* <h1>ITEMS{data?.data.length}</h1> */}
    </header>
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
  }, [ fetchItems]);
  return fetchItems;
};