import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IMenuNodeComposite } from "models/Navigation/MenuNodeComposite";
import * as styles from "./breadcrumbs.module.scss";

export const TruncatedCrumbs = ({ crumbs }) => {
  const itemRef = useRef(null);
  const [state, setState] = useState({
    isExpanded: false,
    wasClicked: false,
    lastEvent: 0
  });

  useEffect(() => {
    const handleMouseClickOutside = (e) => {
      if (!itemRef) return;
      if (state.isExpanded && itemRef.current && !itemRef.current?.contains(e.target)) {
        setState((prev) => ({ ...prev, isExpanded: false, wasClicked: false }));
      }
    };
    document.addEventListener("mousedown", handleMouseClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleMouseClickOutside);
    };
  }, [state.isExpanded]);

  const handleButtonClick = () => {
    const expand = !state.isExpanded || (state.isExpanded && !state.wasClicked);
    setState((prev) => ({ ...prev, isExpanded: expand, wasClicked: expand }));
  };

  return (
    <li className="if" style={{ overflow: state.isExpanded ? "visible" : "hidden" }} ref={itemRef}>
      <button type="button" className="if" data-testid="breadcrumb-menu-div" onClick={handleButtonClick}>
        ...
      </button>
      <nav className={`if tooltip-menu top is-open ${styles.menu}`}>
        <ul data-anatomy="outline bottom" className="if">
          {crumbs.map((crumb: IMenuNodeComposite) => {
            return (
              <li className="if" key={`li-${crumb.id}`}>
                <Link key={`crumb-${crumb.id}`} href={crumb.path}>
                  <a className="if" title={crumb.name}>
                    {crumb.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        <span className="dissection outline bottom" style={{ left: "131px", top: "143px" }} />
      </nav>
    </li>
  );
};
