import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ItemModel } from "../../../models/Item";
import ItemCard from "../../cards/ItemCard";
import Badge from "../../badge/Badge";
import PriceBadge from "../../badge/PriceBadge";
interface SingleItem  {
  item:ItemModel,
  deleteVegetable: (id:number) => void;
  addToCart: (item:ItemModel) => void;
  editeItem: (item:ItemModel) => void;
  isAdmin:boolean
}
const getImageSrc = (type:string) =>  {
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
    default  :{
      return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    }
  }
}



export const Item = ({
  item,
  deleteVegetable,
  isAdmin,
  editeItem,
  addToCart,
}:SingleItem) => {
  const badgeInfo = {type:"red",text:""};

if(item.quantity == 0) {
  console.log(item.quantity);
  badgeInfo.type = "red";
  badgeInfo.text = `No more on stack`
}
else {
  badgeInfo.type = "green";
  badgeInfo.text = `On stack`
}
console.log(item.quantity)
  return (
    <ItemCard>
    <div className="name">{item.name}</div>
    <Badge {...badgeInfo} />
    <img src={getImageSrc(item.type)}/>
        <div className="close">
          {isAdmin ? <EditIcon onClick={() => editeItem(item)} /> : null}
          {isAdmin ? (
            <DeleteIcon onClick={() => deleteVegetable(item.id)}></DeleteIcon>
          ) : null}
        
        </div>
        {!isAdmin ? (
            +item.quantity === 0 ? (
              <p className="noMore" >Check avelability </p>
            ) : (
              <button className="addToCart" onClick={() => addToCart(item)}>Add to Cart</button>
            )
          ) : null}
          <PriceBadge price={item.price}/>
    </ItemCard>
  );
};
