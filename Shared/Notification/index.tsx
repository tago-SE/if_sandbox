import React, { useState } from "react";
import EpiLink from "../../../helpers/epi/Controls/EpiLink";
const Notification = props => {
  const [visible, toggleVisible] = useState<boolean>(true);
  return (
    <>
      {" "}
      {visible ? (
          <div
            className={`if notification ${props.blok.type}`}
            data-sketch-symbol="Notification/Dismiss"
            style={{ marginBottom: 0 }}
          >
            <span className="if heading smallest">{props.blok.title}</span>
            <p>{props.blok.body}</p>
            {props.blok.link.linktype != "story" ? (
              <a href={props.blok.link.cached_url} className="if standalone">
                {props.blok.link_title}
              </a>
            ) : (
              <EpiLink href={props.blok.link.cached_url} className="if standalone">
                {props.blok.link_title}
              </EpiLink>
            )}
            <button
              type="button"
              className="if close"
              onClick={() => toggleVisible(visible ? false : true)}
            >
              <span className="if axe sr-only">Close</span>
            </button>
          </div>
      ) : null}
    </>
  );
};
export default Notification;
