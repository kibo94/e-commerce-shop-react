import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../../contexts/ThemeContextProvider";
import { FilterItems } from "../filterItems/FilterItems";
import EditItemModal from "../modals/EditItemModal";
import { Item } from "./item/Item";
import axios from "axios";
import { ItemModel } from "../../models/Item";
import { deleteItemfromList, updateListOfItems } from "../../utils/utils";
import "./Items.css"

interface ItemsModel {
  type: string;
  isAdmin: boolean;
}
export const Items = ({ type, isAdmin }: ItemsModel) => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useFetchItems(type);
  const { value } = useTheme();
  const [isEditModaOpen, setIsEditModaOpen] = useState(false);

  const [singleItem, setSingleItem] = useState<ItemModel>({
    id: 0,
    type: "",
    author: "",
    name: "",
    quantity: 0,
    price:0
  });
  const [name, setName] = useState("");
  const filterFruitHandler = (value: string) => {
    setQuery(value);
  };

  const deleteVegetableHandler = async (id: number) => {
    await axios.delete(`/${type}/${id}`);
    const updatedItems = deleteItemfromList(items, id);
    setItems(updatedItems);
    toast.success("Item has been deleted");
  };
  const editItemHandler = (item: ItemModel) => {
    setIsEditModaOpen(true);
    setSingleItem(item);
    setName(item.name);
  };
  const closeModalHandler = () => {
    setIsEditModaOpen(false);
  };
  const onChangeItemNameHandler = (e: any) => {
    setName(e.target.value);
  };
  const onUpdateItemHandler = async () => {
    try {
      if (singleItem) {
        await axios.put(`/${singleItem?.type}/${singleItem.id}`, {
          ...singleItem,
          name,
        });
        // }
        const updatedItems: ItemModel[] = updateListOfItems(items, {
          ...singleItem,
          name,
        });
        console.log(updatedItems);
        toast.warning("Succefully updated item");
        setItems(updatedItems);
      }
    } catch (error: any) {
      toast.error(error.message);
    }

    setIsEditModaOpen(false);
  };
  const addToCartHandler = async (item: ItemModel) => {
    // const findedItemIndex = items.findIndex(
    //   (myItem: ItemModel) => myItem.id === item.id
    // );
    // const updatedItem = items[findedItemIndex];
    // if (updatedItem.quantity <= 0) {
    //   // toast.error(`No more ${item.name} in storage`)
    // } else {
    //   setCartItems([...cartItems,item])
    //   // Add to cart when cart page is created
    //   toast.success(`Item ${item.name} add to cart`);
    // }
    // updatedItem.quantity =
    //   updatedItem.quantity === 0
    //     ? updatedItem.quantity
    //     : updatedItem.quantity - 1;
    // items[findedItemIndex] = updatedItem;
  };

  let flitredItems: ItemModel[] = [];
  if (Array.isArray(items)) {
    flitredItems = items.filter((item: ItemModel) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  const itemsClass = `ItemList ${value}`;

  return (
    <>
      {isEditModaOpen ? (
        <EditItemModal
          name={name}
          onChangeItemName={onChangeItemNameHandler}
          updateItem={onUpdateItemHandler}
          closeModal={closeModalHandler}
        />
      ) : null}
    
      <h1 className="itemHeading">{type.toUpperCase()}</h1>
      {items && items.length > 0 ? (
        <FilterItems  filterFruit={filterFruitHandler} type={type} />
      ) : null}
      {flitredItems && flitredItems.length > 0 ? (
        <div className="ItemsListContainer">
          <ul className={itemsClass}>
            {flitredItems.map((item: ItemModel) => (
              <Item
                addToCart={addToCartHandler}
                isAdmin={isAdmin}
                key={item.id}
                item={item}
                deleteVegetable={deleteVegetableHandler}
                editeItem={editItemHandler}
              />
            ))}
          </ul>
        </div>
      ) : (
        <h1>Loading {type} data...</h1>
      )}


    </>
  );
};

const useFetchItems = (type: string) => {
  const [items, setItems] = useState<ItemModel[]>([]);
  const fetchItems = useCallback(async () => {
    const data = await axios.get(`/${type}`);
    setItems(data.data);
  }, [type]);
  useEffect(() => {
    setItems([]);
    fetchItems();
  }, [type, fetchItems]);
  return [items, setItems] as const;
};
const useFetchItems2 =   (type: string) => {
  // const [items, setItems] = useState<ItemModel[]>([]);
  const fetchItems = useCallback( async () => {
    const data = await axios.get(`/${type}`);

    return data;
    // setItems(data.data);
  }, [type]);
  // useEffect(() => {
  //   // setItems([]);
  //   fetchItems();
  
  // }, [type, fetchItems]);

  return fetchItems;
};