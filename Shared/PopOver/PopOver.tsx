import React, { useState, useEffect } from "react";
import { wrapper, tooltipbutton } from "./PopOver.module.scss";
interface OwnProps {
  title?;
  text?;
  label?;
  position;
  show?;
}
const PopOver = ({ title, text, label, position, show = false }: OwnProps) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const toggleOverridden = show;
  useEffect(() => {
    setIsShown(show);
  }, [show]);

  return (
    <div className={`if ${wrapper}`}>
      {!toggleOverridden && (
        <button
          type="button"
          className={`if ${tooltipbutton}`}
          aria-label={label}
          onMouseEnter={() =>
            setTimeout(() => {
              setIsShown(true);
            }, 500)
          }
          onMouseLeave={() => setIsShown(false)}
        >
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <title>{label}</title>
            <g
              className="nc-icon-wrapper"
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeWidth="1.5"
              fill="#331e11"
              stroke="#331e11"
            >
              <circle cx="16" cy="16" r="15" fill="none" stroke="#331e11" strokeMiterlimit="10"></circle>{" "}
              <circle data-color="color-2" data-stroke="none" cx="16" cy="24.5" r="1.5" stroke="none"></circle>{" "}
              <path
                data-color="color-2"
                d="M12.908,7.79C15.7,6.555,19.32,6.7,20.555,8.7s.382,4.324-1.735,6.118S16,17.588,16,19"
                fill="none"
                strokeMiterlimit="10"
              ></path>
            </g>
            <rect fill="transparent" width="32" height="32"></rect>
          </svg>
        </button>
      )}
      <div
        aria-hidden={isShown ? false : true}
        aria-labelledby={`${title}`}
        aria-describedby={`${text}`}
        role="dialog"
        className={`if popover ${position} ${isShown ? "is-open" : ""}`}
        style={{
          display: `${isShown ? "initial" : ""}`,
          maxWidth: "initial",
          left: "30px"
        }}
      >
        {title && <span className="if popover-title">{title}</span>}
        {text && <span className="if popover-text">{text}</span>}
      </div>
    </div>
  );
};
export default PopOver;
