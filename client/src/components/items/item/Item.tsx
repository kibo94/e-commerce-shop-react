import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ItemModel } from "../../../models/Item";
interface SingleItem  {
  item:ItemModel,
  deleteVegetable: (id:number) => void;
  addToCart: (item:ItemModel) => void;
  editeItem: (item:ItemModel) => void;
  isAdmin:boolean
}


export const Item = ({
  item,
  deleteVegetable,
  isAdmin,
  editeItem,
  addToCart,
}:SingleItem) => {
  return (
    <>
      <li>
        <div>{item.name}</div>
        <div className="close">
          {isAdmin ? <EditIcon onClick={() => editeItem(item)} /> : null}
          {isAdmin ? (
            <DeleteIcon onClick={() => deleteVegetable(item.id)}></DeleteIcon>
          ) : null}
          {!isAdmin ? (
            item.quantity === 0 ? (
              <p >No more {item.name} in storage </p>
            ) : (
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            )
          ) : null}
        </div>
      </li>
    </>
  );
};
