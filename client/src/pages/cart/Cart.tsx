import React, { useState } from "react";
import { isTemplateMiddle } from "typescript";
import { Item } from "../../components/items/item/Item";
import { ItemModel } from "../../models/Item";
import { getImageSrc, updateListOfItems } from "../../utils/utils";
import "./Cart.scss";
interface CartModel {
  cart: ItemModel[];
  deleteItem: (id: number) => void;
  updateItemQuantity: (item: ItemModel,e:React.ChangeEvent<HTMLInputElement>) => void;
}

const Cart = ({ cart, updateItemQuantity, deleteItem }: CartModel) => {
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
                <img src={getImageSrc(cartItem.type)} />
                <h3>{cartItem.name} </h3>

                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={cartItem.quantity}
                  onChange={(e) => updateItemQuantity(cartItem,e)}
                ></input>
                <p>{cartItem.price} rsd</p>
                <button onClick={() => deleteItem(cartItem.id)}>
                  Delete item
                </button>
              </li>
            ))
          : null}
      </ul>
     {cart.length > 0 ?  <h3 className="totalPrice">Total price : {totalPrice}</h3> : null}
    </div>
  );
};

export default Cart;
