import React from 'react'
import { ItemModel } from '../../models/Item'
interface CartModel {
    cart:ItemModel[]
}
const Cart = ({cart}:CartModel) => {
  console.log(cart)
  return (
    <div>
     
      <ul>
      <h1>Items</h1>
        {cart.length > 0 ? cart.map((cartItem:ItemModel) => <li>{cartItem.name}</li>) : null}
      </ul>
    </div>
  )
}

export default Cart