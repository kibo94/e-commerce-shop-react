import React, { useState } from "react";
interface Li {
  id: any;
  children: any;
  title: any;
}
interface Links {
  links: any;
}
function RecursiveMenu() {
  let links: Li[] = [
    {
      id: 1,
      title: "parent",
      children: [
        {
          id: 11,
          children: [],
          title: "childre23",
        },
        {
          id: 111,
          title: "children1",
          children: [
            {
              id: 1111,
              title: "grandChildren11",
              children: [],
            },
            { id: 11111, title: "grandChildren3t", children: [] },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "parent2",

      children: [
        {
          id: 22,
          children: [],
          title: "childre22",
        },
        {
          id: 222,
          title: "children2",
          children: [
            {
              id: 2222,
              title: "grandChildren",
              children: [],
            },
            {
              id: 3333,
              title: "grandChildren2",
              children: [],
            },
            {
              id: 44,
              title: "grandChildren3",
              children: [
                {
                  id: 1213,
                  title: "dosta vise nemoj",
                  children: [
                    {
                      id: 13421312,
                      title: "dosta vise nemoj molim te",
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  return (
    <ul className="list">
      <HomeLinks links={links} depth={1} />
    </ul>
  );
}
const HomeLinks = ({ links, depth }: any) => {
  const [currentLink, setCurrentLink] = useState<any>({
    parent: true,
    parent2: true,
    children1: true,
  });
  const [id, setId] = useState(null);
  const toogleLink = (link: any) => {
    setId(id == link.id ? null : link.id);
    setCurrentLink({
      ...currentLink,
      [link.title]: !currentLink[link.title],
    });
  };
  return (
    <>
      {links.map((link: any, i: any) => {
        return (
          <li className={"link" + depth + " link"} key={link.title}>
            <span> {link.title}</span>
            {link.children.length > 0 ? (
              <button onClick={() => toogleLink(link)}>
                {id == link.id ? "-" : "+"}
              </button>
            ) : null}

            {currentLink[link.title] && link.children ? (
              <HomeLinks links={link.children} depth={depth + 1} />
            ) : null}
          </li>
        );
      })}
    </>
  );
};
export default RecursiveMenu;
