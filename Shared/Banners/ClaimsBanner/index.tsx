import React from "react";
import marked from "marked";
import EpiLink from "../../../../helpers/epi/Controls/EpiLink";
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a href="${href}" title="${title}" class="if standalone">${text}</a>`;
};
renderer.paragraph = function (text) {
  return `<p class="if">${text}</p>`;
};

const Index = (title, linkTitle, linkHref, linkText) => (
  <div className="if banner claims">
    <div className="if container">
      <span className="if title">{title}</span>
      <EpiLink href={linkHref} title={linkTitle} className="if standalone">
        {linkText}
      </EpiLink>
    </div>
  </div>
);

export default Index;
