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

export const checkAllFieldsEmpty= (fields: any) => {
  const valuesToArray = Object.values(fields);
  const validFrom = valuesToArray.every(
    (value: any) => value && value.length >= 0
  );
  return validFrom;
};
export const checkAllFieldsAreValid = (fields: any) => {
  const valuesToArray = Object.values(fields);;
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

export const  getTopThreeItemsFromSpecificType = (type:string,products:ItemModel[]) =>{
  const specificTypeProducts = products.filter(product => product.type === type);
  return specificTypeProducts.slice(0,3)
}

export const getImageSrc = (type:string) =>  {
  switch(type) {
    case "fruits" : {
      return "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80s"
    }
    case "laptops" : {
      return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
    }
    case "vegetables": {
      return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    }
    case "fruits-bck": {
      return "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    }
    case "laptops-bck": {
      return "https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1851&q=80"
    }
    case "vegetables-bck": {
     return "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    }
    default  :{
      return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    }
  }


  
}
