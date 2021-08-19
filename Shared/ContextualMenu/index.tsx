import React, { useEffect, useRef, useState } from "react";

interface ContextualMenuProps {
  wrapperStyle?: React.CSSProperties;
  isOpen: boolean;
  items: React.ReactNode;
  onOutsideClick: () => void;
  onClick: (e) => void;
}

export const ContextualMenu = ({ items, isOpen, onOutsideClick, onClick, wrapperStyle }: ContextualMenuProps) => {
  const menuRef = useRef(null);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!menuRef) return;
      if (isOpen && menuRef.current && !menuRef.current?.contains(e.target)) {
        onOutsideClick();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  return (
    <div style={wrapperStyle}>
      <button type="button" className="if contextual-menu-button" aria-label="Open row menu" onClick={onClick} />
      <nav
        className={`if contextual-menu${isOpen ? " is-open" : ""}`}
        style={{
          top: "41px",
          right: "0px",
          visibility: isOpen ? "visible" : "hidden"
        }}
        ref={menuRef}
      >
        <ul className="if">{items}</ul>
      </nav>
    </div>
  );
};
