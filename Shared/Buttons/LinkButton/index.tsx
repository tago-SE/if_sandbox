import React from "react";
import EpiLink from "../../../../helpers/epi/Controls/EpiLink";
/**
 * Don't think this is used currently...?
 */
const LinkButton = (title, href, type) => (
  <EpiLink href={href} type="button" className={`if button ${type}`}>
    {title}
  </EpiLink>
);
export default LinkButton;
