import React from "react";
import { render } from "@testing-library/react";
import Breadcrumbs from "./Breadcrumbs";

const crumbs = [
  {
    description: "",
    icon: "",
    id: 109,
    isVisibleInMenu: true,
    name: "Home",
    navigationLevel: 0,
    path: "/",
    routeData: [
      {
        path: "/",
        title: "Home"
      }
    ]
  },
  {
    navigationLevel: 1,
    name: "Products",
    isVisibleInMenu: true,
    icon: "",
    description: "All data products",
    path: "/products/",
    routeData: [
      {
        path: "/",
        title: "Home"
      },
      {
        path: "/products",
        title: "Products"
      }
    ],
    id: 197,
    crossLinkHeading: {
      name: "Popular data products",
      crossLinks: [
        {
          contentLinkId: 238,
          name: "Car Insurance Norway",
          path: "/"
        },
        {
          contentLinkId: 239,
          name: "See Engagement Property",
          path: "/"
        },
        {
          contentLinkId: 240,
          name: "Check health coverage",
          path: "/"
        }
      ]
    }
  },
  {
    description: "",
    icon: "car",
    id: 198,
    isVisibleInMenu: true,
    name: "Mobility",
    navigationLevel: 2,
    path: "/products/mobility/",
    routeData: [
      {
        path: "/",
        title: "Home"
      },
      {
        path: "/products",
        title: "Products"
      },
      {
        path: "/products/mobility",
        title: "Mobility"
      }
    ]
  },
  {
    description: "",
    icon: "",
    id: 192,
    isVisibleInMenu: true,
    name: "Car Insurance Norway",
    navigationLevel: 3,
    path: "/products/mobility/car-insurance-norway/",
    routeData: [
      {
        path: "/",
        title: "Home"
      },
      {
        path: "/products",
        title: "Products"
      },
      {
        path: "/products/mobility",
        title: "Mobility"
      },
      {
        path: "/products/mobility/car-insurance-norway",
        title: "Car Insurance Norway"
      }
    ]
  }
];

describe(`Breadcrumbs component`, () => {
  it(`Render ordered list with correct classes`, () => {
    const { getByTestId } = render(<Breadcrumbs crumbs={null} />);
    expect(getByTestId("breadcrumb-ol")).toHaveClass("if breadcrumbs");
  });
  it(`Render maximum 3 levels, first level should be a popup`, () => {
    const { getByTestId } = render(<Breadcrumbs crumbs={crumbs} />);
    expect(getByTestId("breadcrumb-ol").children.length).toEqual(3);
  });
});
