import React from "react";
const ExternalLink = props => {
  return (
    <a className="if external-link" rel="noopener noreferrer" href={props.href} target={"_blank"}>
      {props.title}
    </a>
  );
};
export { ExternalLink };
