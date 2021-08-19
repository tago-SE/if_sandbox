import React, { useState } from "react";
import marked from "marked";
const renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a href="${href}" title="${title}" class="if standalone">${text}</a>`;
};
renderer.paragraph = function(text) {
  return `<p class="if">${text}</p>`;
};
const Panel = (props, id) => {
  const [expanded, toggleExpandable] = useState(false);
  return (
      <div
        className={`if panel is-expandable light ${expanded ? "is-open" : ""}`}
      >
        <div
          className="if title"
          aria-expanded="false"
          aria-controls={`exp-main-${id}`}
          tabIndex={id}
          onClick={() => toggleExpandable(expanded ? false : true)}
        >
          {props.blok.title}
        </div>
        <div className="if content" role="region" id={`exp-main-${id}`}>

        </div>
      </div>
  );
};
export default Panel;
