import React, { useState } from "react";
import { isTemplateMiddle } from "typescript";
import { Item } from "../../components/items/item/Item";
import { ItemModel } from "../../models/Item";
import { getImageSrc, updateListOfItems } from "../../utils/utils";
import "./Cart.scss";
interface CartModel {
  cart: ItemModel[];
  deleteItem:(id:number) => void;
  updateItemQuantity:(item:ItemModel) => void;
}
const Cart = ({ cart , updateItemQuantity , deleteItem}: CartModel) => {
 

  return (
    <div className="Cart">
      <ul>
        <h1>Items</h1>
        {cart.length > 0
          ?  cart.map((cartItem: ItemModel) => (
              <li>
                <img src={getImageSrc(cartItem.type)}/>
                <h3>{cartItem.name} </h3>
                <button onClick={() => deleteItem(cartItem.id)}>Delete item</button>
                <input
                  onChange={() => updateItemQuantity(cartItem)}
                  type="number"
                  value={cartItem.quantity}
                />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Cart;
