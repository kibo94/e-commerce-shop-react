import { Items } from "../components/items/Items";
import {ItemModel} from "../models/Item"
import { User } from "../models/User";
export const setModeValue = (mode:string) => (mode === "dark" ? "light" : "dark");
export const getMode = (mode:string) => mode;

export const isAdmin = (user:User) => {
  switch (user.userName) {
    case "bojanb106@gmail.com": {
      return true;
    }
    default:
      return false;
  }
};
export const convertToHttps = (url:string) => {
  let isHttp = url.includes("http:");
  return isHttp ? url.replace("http", "https") : url;
};

export const updateListOfItems = (items:ItemModel[], item:ItemModel) => {
  const updatedItems = items.map((singleItem) => {
    if (singleItem.id === item.id) {
      singleItem = item;
      return singleItem;
    } else {
      return singleItem;
    }
  });
  return updatedItems;
};
export const deleteItemfromList = (items:ItemModel[], id:number) => items.filter((item) => item.id !== id)

export const parseObject = (obj:any) => JSON.parse(obj);
