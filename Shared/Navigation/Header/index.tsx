import React from "react";
// import "./menu.module.scss"; // wrong

import { MenuList, MenuListItem, MenuContainer, SubMenuItem } from "./Menu";

export { MenuList, MenuListItem, MenuContainer, SubMenuItem };

export const Holder = ({ children = null, className = "", ...props }) => {
  return (
    <div className={`if holder ${className}`} {...props}>
      {children}
    </div>
  );
};

export const Showcase = ({ children = null, className = "", ...props }) => {
  return (
    <div className={`if showcase ${className}`} {...props}>
      {children}
    </div>
  );
};

export const Container = ({ children = null, className = "", ...props }) => {
  return (
    <div className={`if container ${className}`} {...props}>
      {children}
    </div>
  );
};

export const MobileContainer = ({ children = null, className = "", ...props }) => {
  return (
    <div className={`if mobile ${className}`} {...props}>
      {children}
    </div>
  );
};

export const DesktopContainer = ({ children = null, className = "", ...props }) => {
  return (
    <div className={`if desktop container ${className}`} {...props}>
      {children}
    </div>
  );
};

export const Description = ({ children = null, className = "", label = "", ...props }) => {
  return (
    <div className="if description" {...props}>
      <strong className="if">{label}</strong>
      {children}
    </div>
  );
};

export const CustomHolder = ({ children = null, className = "", ...props }) => {
  return (
    // <div className={`if holder primary`} {...props}>
    <div className={`if holder`} {...props}>
      <Showcase>
        <Description label="Your APIs / Event Documentation (16) " />
        <ul className="if">
          {[0, 1, 2, 3, 4].map((index) => {
            return (
              <li className="if" style={{ listStyle: "none" }}>
                <a className="if" href="">
                  Blabla
                </a>
              </li>
            );
          })}
        </ul>
      </Showcase>
    </div>
  );
};

export const CustomLeftSide = ({ children = null, className = "", ...props }) => {
  return (
    <div className={`if holder ${className}`} {...props}>
      {/* <MenuList className="crosslinks buttons two no-border" isOpen={true} style={{ borderRight: "none" }}> */}
      <MenuList className="crosslinks buttons two no-border" isOpen={true}>
        <Showcase className="leftSide">
          <Description label="API Documentation" />
          <ul className="if">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
              return (
                <li className="if" style={{ listStyle: "none", color: "#0054f0" }}>
                  <a className="if" href="">
                    Accident Road Side assistance
                  </a>
                </li>
              );
            })}
          </ul>
        </Showcase>
        <Showcase className="leftSide">
          <Description label="Event Documentation" />
          <ul className="if">
            {[0, 1, 2, 3, 4].map((index) => {
              return (
                <li className="if" style={{ listStyle: "none" }}>
                  <a className="if" href="">
                    Updated Common Customers
                  </a>
                </li>
              );
            })}
          </ul>
        </Showcase>
        <Showcase className="leftSide">
          <Description label="Third section" />
          <ul className="if">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((index) => {
              return (
                <li className="if" style={{ listStyle: "none" }}>
                  <a className="if" href="">
                    Updated Common Customers
                  </a>
                </li>
              );
            })}
          </ul>
        </Showcase>
      </MenuList>
    </div>
  );
};

export const OnlyLinksLeftSide = ({ children = null, className = "", ...props }) => {
  return (
    <div className={`if holder ${className}`} {...props}>
      {/* <MenuList className="crosslinks buttons two no-border" isOpen={true} style={{ borderRight: "none" }}> */}
      <MenuList className="crosslinks buttons one no-border" isOpen={true} style={{ borderRight: "none" }}>
        <Showcase className="">
          <Description label="Inspiration" />
          <ul className="if">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
              return (
                <li className="if" style={{ listStyle: "none", color: "#0054f0" }}>
                  <a className="if" href="">
                    Accident Road Side assistance
                  </a>
                </li>
              );
            })}
          </ul>
        </Showcase>
      </MenuList>
    </div>
  );
};
