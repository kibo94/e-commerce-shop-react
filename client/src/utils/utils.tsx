import { Items } from "../components/items/Items";
import { ItemModel } from "../models/Item";
import { User } from "../models/User";
export const setModeValue = (mode: string) =>
  mode === "dark" ? "light" : "dark";
export const getMode = (mode: string) => mode;

export const isAdmin = (user: User) => {
  switch (user.userName) {
    case "bojanb106@gmail.com": {
      return true;
    }
    default:
      return false;
  }
};
export const convertToHttps = (url: string) => {
  let isHttp = url.includes("http:");
  return isHttp ? url.replace("http", "https") : url;
};

export const updateListOfItems = (items: ItemModel[], item: ItemModel) => {
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
export const deleteItemfromList = (items: ItemModel[], id: number) =>
  items.filter((item) => item.id !== id);

export const parseObject = (obj: any) => JSON.parse(obj);

export const checkAllFieldsAreValid = (fields: any) => {
  const valuesToArray = Object.values(fields);
  console.log(fields);
  const validFrom = valuesToArray.every(
    (value: any) => value.message.length <= 0 && value.touched
  );
  return validFrom;
};

// Validation form fileds utils
export function validateField(field: any, value: any) {
  const cantBeEmpty = `${field} can't be empty`;
  const invalidEmail = "Email is not valid!!";

  let message = "";

  if (value.length <= 0) {
    message = cantBeEmpty;
    return message;
  }
  switch (field) {
    case "name": {
      if (value.length <= 3) {
        message = `${field} should have minimum ${3} chars`;
      }
      break;
    }
    case "email": {
      if (!validateEmail(value)) {
        message = invalidEmail;
      }
      break;
    }
    case "username": {
      if (value.length <= 3) {
        message = `${field} should have minimum ${3} chars`;
      }
      break;
    }
    case "message": {
      if (value.length <= 20) {
        message = `${field} should have minimum ${20} chars`;
      }
      break;
    }

    case "password": {
      if (value.length <= 3) {
        message = `${field} should have minimum ${3} chars`;
      }
      break;
    }
    default: {
      message = "";
      break;
    }
  }
  return message;
}
export function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
