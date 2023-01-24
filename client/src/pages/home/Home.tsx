import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import { Items } from "../../components/items/Items";
import RecursiveMenu from "../../components/recursiveMenu/RecursiveMenu";

import "./Home.scss";
import Slider from "../../components/slider/Slider";
import { getTopThreeItemsFromSpecificType } from "../../utils/utils";
interface H1Styled {
  primary: boolean;
  secondory?: string;
}

export default function Home(props: any) {
  const navigate = useNavigate();

  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: ${(props: H1Styled) => (props.primary ? "white" : "black")};
    svg {
      color: ${(props: H1Styled) => props.secondory};
      margin-left: 10px;
      vertical-align: middle;
    }
  `;

  useEffect(() => {
    if (!props.user) {
      // navigate("/login");
    }
  }, []);
  const data = [
    {
      name: "chl",
      children: [
        {
          name: "grand",
          children: [
            {
              name: "grandGrand",
              children: [],
            },
          ],
        },
        {
          name: "grand2",
          children: [
            {
              name: "grandGrand2",
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "gaha",
      children: [],
    },
  ];
  const serachTerm = "grandGrand2";
  // const arr = [];
  const allCats = (items: any) => {
    let res = items.filter((item: any) => {
      if (item.children && item.children.length > 0) {
        allCats(item.children);
      }
      if (item.name.includes(serachTerm)) {
        return item;
      }
    });
    return res;
  };

  allCats(data);
  const filterByLabel = (array: any, searchTerm: string) => {
    return array.reduce((prev: any, curr: any) => {
      const children = curr.children
        ? filterByLabel(curr.children, searchTerm)
        : undefined;

      return curr.name.includes(searchTerm) || children?.length > 0
        ? [...prev, { ...curr, children }]
        : prev;
    }, []);
  };

  return (
    <div className="Home container-top">
      <div className="heroImg">
        <img src="https://plus.unsplash.com/premium_photo-1670462145715-c32d0c91e81b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80" />
      </div>
      <div className="slideContainer">
        <h1>TOP FRUITS</h1>
        <Slider
          products={getTopThreeItemsFromSpecificType("fruits", props.products)}
        />

        <h1>TOP LAPTOPS</h1>
        <Slider
          products={getTopThreeItemsFromSpecificType("laptops", props.products)}
        />

        <h1>TOP VEGETABLES</h1>
        <Slider
          products={getTopThreeItemsFromSpecificType(
            "vegetables",
            props.products
          )}
        />
      </div>

      {/* <RecursiveMenu /> */}
    </div>
  );
}
