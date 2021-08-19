import React, { useState } from "react";

interface DropdownFilterProps {
  id: string;
  title: string;
  button?: {
    className?: string;
    style?: React.CSSProperties;
  };
}

/**
 * @todo Pending changes
 * @deprecated This component does not work on versions of the design-system older than 12 (?)
 * @param props
 */
export const DropdownFilter: React.FC<DropdownFilterProps> = (props) => {
  const [state, setState] = React.useState({
    isOpen: false
  });

  const onButtonClick = () => {
    setState((prevState) => ({ ...state, isOpen: prevState.isOpen ? false : true }));
  };

  return (
    <div className="if dropdown-filter-holder">
      <button
        type="button"
        aria-controls="index-office-filters-1"
        aria-haspopup="true"
        role="combobox"
        aria-owns="index-office-filters-1"
        aria-expanded="false"
        className={`if dropdown-filter-button ${props.button?.className || ""}`}
        onClick={onButtonClick}
      >
        {props.title}
      </button>
      <div className={`if dropdown-filter is-open`} id={props.id} role="listbox">
        <ul className={`if ${state.isOpen ? "is-open" : "is-closed"}`} aria-activedescendant="index-office-filter-2">
          {state.isOpen ? (
            <>
              <li className="if">
                <input
                  id="index-office-filter-1"
                  type="checkbox"
                  role="option"
                  aria-selected="false"
                  data-rel="London"
                  className="if checkbox"
                />
                <label className="if" htmlFor="index-office-filter-1">
                  London
                </label>
              </li>
              <li className="if">
                <input
                  id="index-office-filter-2"
                  type="checkbox"
                  role="option"
                  aria-selected="false"
                  data-rel="Moscow"
                  className="if checkbox"
                />
                <label className="if" htmlFor="index-office-filter-2">
                  Moscow
                </label>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
};
