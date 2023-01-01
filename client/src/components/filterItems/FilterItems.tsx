import React from "react";
import "../items/Items.css"
interface FilterItemsModel {
  filterFruit: (inputValue:string) => void,
  type: string
}
export const FilterItems = ({ filterFruit , type }:FilterItemsModel) => {
  return (
    <div className="FilterItems">
      <input
       className="search"
        placeholder={"Search " + type}
        onChange={(e) => filterFruit(e.target.value)}
      />
    </div>
  );
};
