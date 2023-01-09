import "./App.scss";
import { useEffect, useState } from "react";
// import UserStatus from "./components/userStatus/UserStatus";
import useLocalStorageHook from "./hooks/useLocalStorageHook";
import {
  getMode,
  isAdmin,
  parseObject,
  updateListOfItems,
} from "./utils/utils";
import Home from "./pages/home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AddItem } from "./pages/admin/addItem/AddItem";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { useTheme } from "./contexts/ThemeContextProvider";
import { Header } from "./containers/header/Header";
import { Items } from "./components/items/Items";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "./components/popup/Popup";
import { usePopUp } from "./contexts/PopupContext";
import AdminItems from "./pages/admin/items/AdminItems";
import { User } from "./models/User";
import { QueryClient, QueryClientProvider } from "react-query";
import Contact from "./pages/contact/Contact";
import axios from "axios";
import Admin from "./pages/admin/Admin";
import Cart from "./pages/cart/Cart";
import { ItemModel } from "./models/Item";

function App() {
  const { popUp } = usePopUp();

  // const [seconds, setSeconds] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [miliseconds, setMiliSeconds] = useState(0);
  const [stopWatchPlay, setStapWatchPlay] = useState(true);
  const [authUser, setAuthUser] = useLocalStorageHook("auth", false);
  const [user, setUser] = useState(parseObject(authUser));
  const [admin, setAdmin] = useState(false);
  const { value } = useTheme();
  const navigate = useNavigate();
  const itemsRoutes = ["fruits", "vegetables", "laptops"];
  const [online, setOnline] = useUserTimeOut(user);
  const [cart, setCart] = useState<ItemModel[]>([]);
  const queryClient = new QueryClient();
  useEffect(() => {
    const mode = getMode(value);
    if (mode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [value]);
  useEffect(() => {
    setOnline(parseObject(authUser));
    if (admin) {
      navigate("/admin");
    }
    if (parseObject(authUser).userName) {
      setAdmin(isAdmin(parseObject(authUser)));
    } else {
      setAdmin(false);
    }
  }, [authUser, admin]);

  // useEffect(() => {
  //   if (stopWatchPlay) {
  //     let interval2 = setInterval(() => {
  //       // setMiliSeconds(miliseconds >= 100 ? 0 : miliseconds + 1);
  //     }, 10);
  //     return () => {
  //       // clearInterval(interval2);
  //     };
  //   }
  // }, [miliseconds, stopWatchPlay]);
  // useEffect(() => {
  //   if (stopWatchPlay) {
  //     let interval = setInterval(() => {
  //       // setMinutes(seconds >= 60 ? minutes + 1 : minutes)
  //       // setSeconds(seconds >= 60 ? 0 : seconds + 1);
  //     }, 1000);
  //     return () => {
  //       // clearInterval(interval);
  //     };
  //   }
  // }, [stopWatchPlay, seconds, minutes]);

  const backStatusOnline = () => {
    if (user) {
      setOnline(true);
    }
    setStapWatchPlay(!stopWatchPlay);
  };

  const loginUser = (username: string, password: string, id: any) => {
    console.log(id);
    setAuthUser(
      JSON.stringify({
        userName: username,
        password: password,
        id,
      })

    );
    navigate("/home");
  };
  const logoutUserHandler = async (user: User) => {
    console.log(user);
    await axios.delete(`/logedUsers/${user.id}`);
    setAuthUser(false);
    setUser(false);
    navigate("/login");
  };
  function addToCart(item: ItemModel) {
    if(cart.length == 0) {
      setCart([...cart,{...item,quantity:1}]);
    }
    else {
      const alreadyExists = cart.find(c => c.id == item.id)
      if(alreadyExists) {
        alreadyExists.quantity = alreadyExists.quantity + 1;
        const updatedItems = updateListOfItems(cart, alreadyExists);
        setCart(updatedItems);
      }
      else {
        setCart([...cart,{...item,quantity:1}]);
      }
    }
    toast.success("Cart item has been added")
  }
    
  function updateItemQuantityHandler(item: ItemModel,type:string) {
    const newItem = { ...item };
    newItem.quantity =  type === "add" ? newItem.quantity + 1 : newItem.quantity -1
    const updatedItems = updateListOfItems(cart, newItem);
    setCart(updatedItems);
 
  }
  function deleteItemHandler(id: number) {
    setCart(cart.filter((cart) => cart.id !== id));
    toast.success("Cart item has been removed")
  }
  const appClass = `App ${getMode(value)}`;
async function finishShopingHandler () {
  const items = await (await axios("/products")).data;
   items.map( async (item:ItemModel) =>  {
    const findedItem = cart.find(cartItem => cartItem.id === item.id)
    if(findedItem) {
      item.quantity = +item.quantity - +findedItem?.quantity;
      await axios.put(`/products/${item.id}`,item)
    
    }
  
  })


  setCart([])
  toast.success("Shoping has been finished")
}
  return (
    <div className={appClass} onClick={backStatusOnline}>
      <QueryClientProvider client={queryClient}>
        {popUp.display ? <Popup /> : null}
        {/* <MemoTeste myUser={myUser}/> */}
        <ToastContainer />

        {/* <button onClick={() => setMyUser(myUser==="red" ? "blue" : "red")}>Change user</button> */}
        {/* <StopWatch seconds={seconds} miliseconds={miliseconds} minutes={minutes} /> */}
        <Header
        cart={cart}
          admin={admin}
          authUser={parseObject(authUser)}
          logoutUser={() => logoutUserHandler(parseObject(authUser))}
          online={online}
        />

        <Routes>
          <Route path="/home" element={<Home user={parseObject(authUser)} />} />

          {itemsRoutes.map((item) => {
            return (
              <Route
                path={`/${item}`}
                element={
                  <Items type={item} isAdmin={admin} addToCart={addToCart} />
                }
              />
            );
          })}
          <Route path="/admin" element={<Admin />} />
          <Route path="/items" element={<AdminItems isAdmin={admin} />} />
          {<Route path="/addItem" element={<AddItem admin={admin} />} />}
          <Route
            path="/login"
            element={<Login login={loginUser} user={parseObject(authUser)} />}
          />
          <Route path="/register" element={<Register user={authUser} />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={
              <Cart
              finishShoping={finishShopingHandler}
              
                cart={cart}
                deleteItem={deleteItemHandler}
                updateItemQuantity={updateItemQuantityHandler}
              />
            }
          />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;

const useUserTimeOut = (user: User) => {
  const [online, setOnline] = useState(false);
  const offlineModeTurnOn = 3000;
  useEffect(() => {
    let userOnlineTimeOut = setTimeout(() => {
      if (user) {
        setOnline(false);
      }
    }, offlineModeTurnOn);
    return () => {
      clearTimeout(userOnlineTimeOut);
    };
  }, [online, user]);
  return [online, setOnline] as const;
};
