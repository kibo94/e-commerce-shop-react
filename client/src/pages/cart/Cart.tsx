import React, { useState } from "react";
import { isTemplateMiddle } from "typescript";
import { Item } from "../../components/items/item/Item";
import { ItemModel } from "../../models/Item";
import { getImageSrc, updateListOfItems } from "../../utils/utils";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./Cart.scss";
import { AdbSharp } from "@mui/icons-material";
import PriceBadge from "../../components/badge/PriceBadge";
interface CartModel {
  cart: ItemModel[];
  deleteItem: (id: number) => void;
  updateItemQuantity: (item: ItemModel,type:string) => void;
  finishShoping: () => void;
}

const Cart = ({ cart, updateItemQuantity, deleteItem , finishShoping}: CartModel) => {
  let  totalPrice = 0
cart.forEach(c => {
   totalPrice += c.price * c.quantity;
})
  return (
    <div className="Cart">
      {cart.length > 0 ?    <h1  className="heading">Items</h1> : <h1 className="heading">Empy cart</h1>}
   
      <ul className="responsiveGrid">
        {cart.length > 0
          ? cart.map((cartItem: ItemModel) => (
              <li>
                {cartItem.quantity > 0  ? 
                <>
                  <img src={getImageSrc(cartItem.type)} />
                <h3>{cartItem.name} </h3>
                <div className="changeQuantity">
                  <AddIcon className="icon" onClick={() => updateItemQuantity(cartItem,"add")}/>
                  <RemoveIcon className="icon" onClick={() => updateItemQuantity(cartItem,"sub")} />
                  <span>Q : {cartItem.quantity}</span>
                </div>
                {/* <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={cartItem.quantity}
                  onChange={(e) => updateItemQuantity(cartItem,e)}
                ></input> */}
                <PriceBadge price={cartItem.price} key={cartItem.id}/>
                <CloseIcon className="deleteItem" onClick={() => deleteItem(cartItem.id)}/>
                
                </>
              
: null}
              </li>
            ))
          : null}
      </ul>
      {cart.length > 0 ?  <div className="totalPrice">
      <h3 >Total price : {totalPrice}</h3> 
      <button onClick={finishShoping}>Finish shoping</button> 
      </div>:null}
    
    </div>
  );
};

export default Cart;
