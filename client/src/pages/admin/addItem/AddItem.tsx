import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePopUp } from "../../../contexts/PopupContext";
import axios from "axios";
import "./AddItem";
import { checkAllFieldsEmpty } from "../../../utils/utils";
import { ItemModel } from "../../../models/Item";
interface AddItemProps {
  admin: boolean;
  updateProducts:(product:ItemModel) => void;
}
export const AddItem = ({ admin , updateProducts}: AddItemProps) => {
  const { onChange, popUp } = usePopUp();
  const [open, setOpen] = React.useState(false);
  const [itemData, setItemData] = useState({
    name: "",
    price: "",
    quantity: "1",
    type: "",
  });

  const navigate = useNavigate();
  const itemRef: any = useRef();

  useEffect(() => {
    if (!admin) {
      // navigate("/home");
    }
  }, [admin, navigate]);

  useEffect(() => {
  }, [itemData]);
  const handleOpen = () => {
    setOpen(!open);
  };
  const selectItem = (item: any) => {
    setOpen(false);
    setItemData({ ...itemData, type: item });
  };

  const addItemHanlder = async () => {
    if (itemRef.current.value.length > 2) {
      const createdItem:ItemModel = {
        id: Math.random(),
        author: "admin",
        ...itemData,
        price:+itemData.price
        
      };
      try {
        await axios.post(`/products`, createdItem);

        // toast.success("Item sucessefuly added")
        updateProducts(createdItem)
        onChange({
          ...popUp,
          type: "success",
          message: "Item sucessefuly added",
          delay: 2000,
        });
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      alert("minimum chars are 3");
    }
    setItemData({
      name: "",
      price: "",
      quantity: "1",
      type: "",
    })
  };

  const onChangePrice = (e: any) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };
  return (
    <div className="AddItem container-top">
      {checkAllFieldsEmpty(itemData) ? (
        <button  onClick={addItemHanlder}>Add Item</button>
      ) : null}
      <div className="dropdown">
        <button className="dropDownButton" onClick={handleOpen}>Select type of product</button>
        {open ? (
          <ul className="menu">
            <li className="menu-item">
              <button onClick={() => selectItem("fruits")}>Fruits</button>
            </li>
            <li className="menu-item">
              <button onClick={() => selectItem("vegetables")}>
                Vegetables
              </button>
            </li>
            <li className="menu-item">
              <button onClick={() => selectItem("laptops")}>Laptops</button>
            </li>
          </ul>
        ) : null}
      </div>
      <h2>{itemData.type}</h2>
      <div className="plusMunuts form">
        <input
          ref={itemRef}
          placeholder="Enter item name"
          name="name"
          onChange={onChangePrice}
          value={itemData.name}
        />
        <input
          onChange={onChangePrice}
          type="number"
          value={itemData.quantity}
          name="quantity"
        />
        <input
          onChange={onChangePrice}
          type="number"
          value={itemData.price}
          name="price"
        />
      </div>
    </div>
  );
};
