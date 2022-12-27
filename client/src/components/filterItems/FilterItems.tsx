import React from "react";

interface FilterItemsModel {
  filterFruit: (inputValue:string) => void,
  type: string
}
export const FilterItems = ({ filterFruit , type }:FilterItemsModel) => {
  return (
    <div className="FilterItems">
      <input
        placeholder={"Search " + type}
        onChange={(e) => filterFruit(e.target.value)}
      />
    </div>
  );
};
