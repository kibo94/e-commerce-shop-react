import "./App.scss";
import {  useEffect, useState } from "react";
// import UserStatus from "./components/userStatus/UserStatus";
import useLocalStorageHook from "./hooks/useLocalStorageHook";
import { getMode, isAdmin, parseObject } from "./utils/utils";
import Home from "./pages/home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AddItem } from "./pages/admin/addItem/AddItem";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { useTheme } from "./contexts/ThemeContextProvider";
import { Header } from "./containers/header/Header";
import { Items } from "./components/items/Items";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "./components/popup/Popup";
import { usePopUp } from "./contexts/PopupContext";
import AdminItems from "./pages/admin/items/AdminItems";
import { User } from "./models/User";
import { QueryClient, QueryClientProvider } from "react-query";
import Contact from "./pages/contact/Contact";
import axios from "axios";
import Admin from "./pages/admin/Admin";


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
  const queryClient = new QueryClient()
  useEffect(() => {
    setOnline(parseObject(authUser));
    if (admin) {
      navigate("/admin");
    } else {
      navigate("/home");
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

  const loginUser = (username: string, password: string,id:any) => {
    console.log(id)
    setAuthUser(
      JSON.stringify({
        userName: username,
        password: password,
        id
      })
    );
    navigate("/home");
  };
  const logoutUserHandler =  async (user:User) => {
    console.log(user)
    await axios.delete(`/logedUsers/${user.id}`);
    setAuthUser(false);
    setUser(false);
 alert(1)
    navigate("/login");

  };

  const appClass = `App ${getMode(value)}`;

  return (
    <div className={appClass} onClick={backStatusOnline}>
           <QueryClientProvider client={queryClient}>
      {popUp.display ? <Popup /> : null}
      {/* <MemoTeste myUser={myUser}/> */}
      <ToastContainer />

      {/* <button onClick={() => setMyUser(myUser==="red" ? "blue" : "red")}>Change user</button> */}
      {/* <StopWatch seconds={seconds} miliseconds={miliseconds} minutes={minutes} /> */}
      <Header
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
              element={<Items type={item} isAdmin={admin} />}
            />
          );
        })}
        <Route path="/admin" element={<Admin  />} />
        <Route path="/items" element={<AdminItems isAdmin={admin} />} />
        {<Route path="/addItem" element={<AddItem admin={admin} />} />}
        <Route
          path="/login"
          element={<Login login={loginUser} user={parseObject(authUser)} />}
        />
        <Route path="/register" element={<Register user={authUser} />} />
        <Route path="/contact" element={<Contact  />} />
      </Routes>
      </QueryClientProvider>
    </div>

  );
}

export default App;


const useUserTimeOut = (user:User) => {
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
  }, [online,user]);
  return [online, setOnline] as const
}
