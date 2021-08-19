import React, { useEffect } from "react";
import * as styles from "./simple-modal.module.scss";

export interface ISimpleModal {
  title: string;
  description?: string;
  content: any;
  footer?: any;
  show?: boolean;
  onClose?: () => void;
}

export const SimpleModal: React.FC<ISimpleModal> = ({ title, show = true, description, content, footer, onClose }) => {
  if (!show) return null;
  return (
    <>
      <div className="if backdrop is-open" />
      <div
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={`if modal ${styles.modal}`}
      >
        <div className={`if title ${styles.title}`} id="dialog-title">
          {title}
          <button
            type="button"
            className="if close"
            aria-label="Close modal"
            onClick={onClose}
            data-cy="modal-title-close"
          ></button>
        </div>
        <span className="if axe sr-only" id="dialog-description">
          {description}
        </span>
        <div className="if content">{content}</div>
        {footer && <div className="if footer">{footer}</div>}
      </div>
    </>
  );
};

export default SimpleModal;
