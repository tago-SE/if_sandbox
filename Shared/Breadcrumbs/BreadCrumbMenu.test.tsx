import React from "react"
import { render } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import BreadCrumbMenu from "./TruncatedCrumbs";

const menuItems = [
  {
    "description": "",
    "icon": "",
    "id": 109,
    "isVisibleInMenu": true,
    "name": "Home",
    "navigationLevel": 0,
    "path": "/",
    "routeData": [
      {
        "path": "/",
        "title": "Home"
      }
    ]
  },
  {
    "navigationLevel": 1,
    "name": "Products",
    "isVisibleInMenu": true,
    "icon": "",
    "description": "All data products",
    "path": "/products/",
    "routeData": [
      {
        "path": "/",
        "title": "Home"
      },
      {
        "path": "/products",
        "title": "Products"
      }
    ],
    "id": 197,
    "crossLinkHeading": {
      "name": "Popular data products",
      "crossLinks": [
        {
          "contentLinkId": 238,
          "name": "Car Insurance Norway",
          "path": "/"
        },
        {
          "contentLinkId": 239,
          "name": "See Engagement Property",
          "path": "/"
        },
        {
          "contentLinkId": 240,
          "name": "Check health coverage",
          "path": "/"
        }
      ]
    }
  }
]

describe(`Breadcrumb menu`, () => {
  it(`Correctly renders breadcrumb menu`, () => {
    const { getByTestId } = render(<BreadCrumbMenu menuItems={menuItems}/>)
    expect(getByTestId("breadcrumb-menu-div")).toHaveClass("if breadcrumbs-menu");
  })
  it(`Toogle menu when being clicked`, () => {
    const { getByTestId } = render(<BreadCrumbMenu menuItems={menuItems}/>);

    expect(getByTestId("breadcrumb-menu-div")).toHaveStyle("overflow: hidden;");
    expect(getByTestId("breadcrumb-menu-div").children.length).toEqual(0);

    act(() => {
      getByTestId("breadcrumb-menu-div").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(getByTestId("breadcrumb-menu-div")).toHaveStyle("overflow: visible;");
    expect(getByTestId("breadcrumb-menu-ul").children.length).toEqual(2);

    act(() => {
      getByTestId("breadcrumb-menu-div").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(getByTestId("breadcrumb-menu-div").children.length).toEqual(0);
    expect(getByTestId("breadcrumb-menu-div")).toHaveStyle("overflow: hidden;");
  })
})