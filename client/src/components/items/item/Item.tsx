import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ItemModel } from "../../../models/Item";
import ItemCard from "../../cards/ItemCard";
import Badge from "../../badge/Badge";
import PriceBadge from "../../badge/PriceBadge";
import { getImageSrc } from "../../../utils/utils";
interface SingleItem {
  item: ItemModel;
  deleteVegetable: (id: number) => void;
  addToCart: (item: ItemModel) => void;
  editeItem: (item: ItemModel) => void;
  isAdmin: boolean;
}

export const Item = ({
  item,
  deleteVegetable,
  isAdmin,
  editeItem,
  addToCart,
}: SingleItem) => {
  const badgeInfo = { type: "red", text: "" };

  if (item.quantity <= 0) {
    badgeInfo.type = "red";
    badgeInfo.text = `No more on stack`;
  } else {
    badgeInfo.type = "green";
    badgeInfo.text = `On stack`;
  }

  return (
    <ItemCard>
      <div className="name">{item.name}</div>
      <Badge {...badgeInfo} />
      <img src={getImageSrc(item.type)} />
      <div className="close">
        {isAdmin ? <EditIcon onClick={() => editeItem(item)} /> : null}
        {isAdmin ? (
          <DeleteIcon onClick={() => deleteVegetable(item.id)}></DeleteIcon>
        ) : null}
      </div>
      {!isAdmin ? (
        +item.quantity <= 0 ? (
          <p className="noMore">Check avelability </p>
        ) : (
          <button className="addToCart" onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        )
      ) : null}
      <PriceBadge price={item.price} />
    </ItemCard>
  );
};
