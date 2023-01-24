import React from "react";
import { useKeenSlider } from 'keen-slider/react' 
import 'keen-slider/keen-slider.min.css';
import { ItemModel } from "../../models/Item";
import { getImageSrc } from "../../utils/utils";
interface SliderProps {
  products:ItemModel[]
}
function Slider({products}:SliderProps) {
  console.log(products)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 15,
    },
  })
  return (
    <div ref={sliderRef} className="keen-slider slider">
      {products.length > 0 ? products.map((product) => (
        <div className="keen-slider__slide slide"> 
         <h1>{product.name}</h1>
         <img src={getImageSrc(product.type)} />
        </div>
      )) : null}
      {/* <div className="keen-slider__slide slide">1</div>
      <div className="keen-slider__slide slide">2</div>
      <div className="keen-slider__slide slide">3</div> */}
    </div>
  );
}

export default Slider;
