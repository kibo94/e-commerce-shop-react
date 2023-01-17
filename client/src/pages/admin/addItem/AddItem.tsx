import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePopUp } from "../../../contexts/PopupContext";
import axios from "axios";
interface AddItemProps {
  admin: boolean;
}
export const AddItem = ({ admin }: AddItemProps) => {
  const { onChange, popUp } = usePopUp();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = useState("");
  const [plusMinus, setPLusMinus] = useState(1);

  const navigate = useNavigate();
  const itemRef: any = useRef();
  useEffect(() => {
    if (!admin) {
      navigate("/home");
    }
  }, [admin,navigate]);
  const handleOpen = () => {
    setOpen(!open);
  };
  const selectItem = (item: any) => {
    setItem(item);
    setOpen(false);
  };
  const addItemHanlder = async () => {
    if (itemRef.current.value.length > 2) {
      const createdItem = {
        id: Math.random(),
        name: itemRef.current.value,
        author: "typicode223",
        type: item,
        quantity: plusMinus,
        price:400
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
  };
  const onChangePlusMinus = (e: any) => {
    setPLusMinus(e.target.value);
  };
  const haveData = 0;
  return (
    <div className="dropdown">
      {haveData ? <h1>HAVE DATA</h1> : null}

      <button onClick={handleOpen}>Dropdown</button>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button onClick={() => selectItem("fruits")}>Fruits</button>
          </li>
          <li className="menu-item">
            <button onClick={() => selectItem("vegetables")}>Vegetables</button>
          </li>
          <li className="menu-item">
            <button onClick={() => selectItem("laptops")}>Laptops</button>
          </li>
        </ul>
      ) : null}
      <input ref={itemRef} placeholder="Enter item name" />
      {!open ? (
        <button onClick={addItemHanlder}>Add Item</button>
      ) : (
        <div>Is Closed</div>
      )}
      <div className="plusMunuts">
        <input onChange={onChangePlusMinus} type="number" value={plusMinus} />
      </div>
    </div>
  );
};
