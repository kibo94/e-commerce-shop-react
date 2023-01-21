import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePopUp } from "../../../contexts/PopupContext";
import axios from "axios";
import "./AddItem";
import { checkAllFieldsEmpty } from "../../../utils/utils";
interface AddItemProps {
  admin: boolean;
}
export const AddItem = ({ admin }: AddItemProps) => {
  const { onChange, popUp } = usePopUp();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = useState("");
  const [plusMinus, setPLusMinus] = useState(1);
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
      const createdItem = {
        id: Math.random(),
        author: "admin",
        ...itemData
        
      };
      try {
        await axios.post(`/products`, createdItem);

        // toast.success("Item sucessefuly added")
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
  const haveData = 0;
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
