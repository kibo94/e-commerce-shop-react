import React from "react";
import { useLocation } from "react-router";
import { ItemModel } from "../../models/Item";
import { getImageSrc } from "../../utils/utils";
import "./SingleProduct.scss"
interface SingleProductProps {
  products: ItemModel[] | null;
}
function SingleProduct({ products }: SingleProductProps) {
  const location = useLocation();
  const id = location.hash.slice(1, location.hash.length);
  const product =
    products!.length > 0
      ? products!.find((singleProduct) => singleProduct.id == +id)
      : null;
  return (
    <div className="SingleProduct">
      {product ? (
        <>
          <img src={getImageSrc(product.type)} />
          <h1>{product.name}</h1>
          <h2>Price : {product.price}</h2>
        </>
      ) : null}
    </div>
  );
}

export default SingleProduct;
