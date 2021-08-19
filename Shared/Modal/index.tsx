import React, { Component } from "react";
import { createPortal } from "react-dom";
import { PrimaryButton, SecondaryButton } from "../Buttons";
export type { ISimpleModal } from "./SimpleModal";
export { SimpleModal } from "./SimpleModal";

export interface IModal {
  title: string;
  description?: string;
  content: any;
  confirm: {
    text: string;
    callback: any;
    isLoading?: boolean;
  };
  cancel: {
    text: string;
    callback: any;
  };
}

export default class Modal extends Component<IModal> {
  state = { isOpen: true };
  onConfirmClick = () => {
    const { confirm } = this.props;

    // Handle loading boolean in parent component
    if (confirm.isLoading !== null) {
      confirm?.callback();
      return;
    } else {
      confirm?.callback();
      this.setState({ isOpen: false });
    }
  };

  onCancelClick = () => {
    const { cancel } = this.props;
    this.setState({ isOpen: false });
    cancel?.callback();
  };

  render() {
    const { title, description, content, confirm, cancel } = this.props;
    const { isOpen } = this.state;
    const isLoading = confirm?.isLoading || false;
    const modal = (
      <>
        <div className={`if backdrop ${isOpen ? "is-open" : ""}`} style={{ zIndex: 100 }}></div>
        <div
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className="if modal"
        >
          <div className="if title" id="dialog-title" style={{ width: "100%", marginBottom: "0rem !important" }}>
            {title}
            <button type="button" className="if close" aria-label="Close modal" onClick={this.onCancelClick}></button>
          </div>
          <span className="if axe sr-only" id="dialog-description">
            {description}
          </span>
          <div className="if content">{content}</div>
          <div className="if footer" style={{ justifyContent: "center", display: "flex" }}>
            <PrimaryButton id="confirmButton" onClick={this.onConfirmClick} loading={isLoading} disabled={isLoading}>
              {confirm?.text}
            </PrimaryButton>
            <SecondaryButton id="cancelButton" onClick={this.onCancelClick}>
              {cancel?.text}
            </SecondaryButton>
          </div>
        </div>
      </>
    );
    return this.state.isOpen ? createPortal(modal, document.querySelector("#modal")) : null;
  }
}
