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
  const [products, setProducts] = useState<ItemModel[]>([]);
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

    if (parseObject(authUser).userName) {
      setAdmin(isAdmin(parseObject(authUser)));
    } else {
      setAdmin(false);
    }
  }, [authUser, admin]);

  useEffect(() => {
    fetchProducts();
  }, []);

  function updateProductsHandler(product:ItemModel) {
    setProducts([...products,product])
  }
  async function fetchProducts() {
    const data = await axios.get(`/products`);
    setProducts(data.data);
  }

  const backStatusOnline = () => {
    if (user) {
      setOnline(true);
    }
    setStapWatchPlay(!stopWatchPlay);
  };

  const loginUser = (
    username: string,
    password: string,
    id: any,
    name: string
  ) => {
    const user = {
      userName: username,
      password: password,
      name: name,
      id,
    };
    setAuthUser(JSON.stringify(user));
    setUser(user);

    navigate("/home");
  };
  const logoutUserHandler = async (user: User) => {
    setAuthUser(false);
    setUser(false);
    navigate("/login");
  };
  function addToCart(item: ItemModel) {
    if (cart.length == 0) {
      setCart([...cart, { ...item, quantity: 1 }]);
    } else {
      const alreadyExists = cart.find((c) => c.id == item.id);
      if (alreadyExists) {
        alreadyExists.quantity = alreadyExists.quantity + 1;
        const updatedItems = updateListOfItems(cart, alreadyExists);
        setCart(updatedItems);
      } else {
        setCart([...cart, { ...item, quantity: 1 }]);
      }
    }
    toast.success("Cart item has been added");
  }

  function updateItemQuantityHandler(item: ItemModel, type: string) {
    const newItem = { ...item };
    newItem.quantity =
      type === "add" ? newItem.quantity + 1 : newItem.quantity - 1;
    const updatedItems = updateListOfItems(cart, newItem);
    setCart(updatedItems);
  }
  function deleteItemHandler(id: number) {
    setCart(cart.filter((cart) => cart.id !== id));
    toast.success("Cart item has been removed");
  }
  const appClass = `App ${getMode(value)}`;
  async function finishShopingHandler() {
    const items = await (await axios("/products")).data;
    items.map(async (item: ItemModel) => {
      const findedItem = cart.find((cartItem) => cartItem.id === item.id);
      if (findedItem) {
        item.quantity = +item.quantity - +findedItem?.quantity;
        await axios.put(`/products/${item.id}`, item);
      }
    });

    setCart([]);
    toast.success("Shoping has been finished");
  }
  let cartWithQuantity: ItemModel[] = [];
  if (cart.length > 0) {
    cartWithQuantity = cart.filter((c) => c.quantity > 0);
  }
  return (
    <div className={appClass} onClick={backStatusOnline}>
      <QueryClientProvider client={queryClient}>
        {popUp.display ? <Popup /> : null}
        <ToastContainer />
        <Header
          cart={cartWithQuantity}
          admin={admin}
          authUser={user}
          logoutUser={() => logoutUserHandler(parseObject(authUser))}
          online={online}
        />
        <Routes>
          <Route path="/" element={<Home user={parseObject(authUser)} products={products} />} />

          {itemsRoutes.map((item) => {
            return (
              <Route
                path={`/${item}`}
                element={
                  <Items
                    key={item}
                    type={item}
                    isAdmin={admin}
                    addToCart={addToCart}
                    products={products}
                  />
                }
              />
            );
          })}
          <Route path="/admin" element={<Admin isAdmin={admin} />} />
          <Route
            path="/items"
            element={<AdminItems isAdmin={admin} products={products} />}
          />
          {<Route path="/addItem" element={<AddItem admin={admin}  updateProducts={updateProductsHandler} />} />}
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
                admin={admin}
                finishShoping={finishShopingHandler}
                cart={cartWithQuantity}
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
