import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ItemModel } from "../../models/Item";
import { getImageSrc } from "../../utils/utils";
import { Link } from "react-router-dom";

interface SliderProps {
  products: ItemModel[];
}
function Slider({ products }: SliderProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides:{
      perView:2 
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  if(products.length === 0) {
    return <h1>No Products</h1>

  }
  return (
    <>

      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider slider">
          {
             products.map((product) => (
                <div className="keen-slider__slide number-slide1 slide">
                  <h1>{product.name}</h1>
                  <img src={getImageSrc(product.type)} />
                  <Link  to={`/singleProduct#${product.id}`}>Details</Link>
                </div>
              ))
          }
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details?.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef?.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details?.slides.length - 1).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
}
function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
export default Slider;
