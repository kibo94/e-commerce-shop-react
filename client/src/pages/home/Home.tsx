import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
import { Items } from "../../components/items/Items";
import RecursiveMenu from "../../components/recursiveMenu/RecursiveMenu";
interface H1Styled {
  primary: boolean;
  secondory?: string;
}

export default function Home(props: any) {
  const navigate = useNavigate();
  const [titlePrimary, setTitlePrimary] = useState(false);
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
  let level = 0;
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
console.log(res)
    return res;
  };

  allCats(data);
  const filterByLabel = (array:any, searchTerm:string) => {
    return array.reduce((prev:any, curr:any) => {
        const children = curr.children ? filterByLabel(curr.children, searchTerm) : undefined;
        
        return curr.name.includes(searchTerm) || children?.length > 0 ? [...prev, { ...curr, children }] : prev;
    }, []);
}

let res = filterByLabel(data, serachTerm);
// console.log(res)

  return (
    <div className="Home">
      <button onClick={() => setTitlePrimary((prev) => !prev)}>
        Toggle color of title
      </button>
      <Title primary={titlePrimary} secondory="red">
        Home
        <CloseIcon />
      </Title>
      {/* <RecursiveMenu /> */}
    </div>
  );
}
