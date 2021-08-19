import React from "react";
import EpiLink from "../../../../helpers/epi/Controls/EpiLink";

const Index = props => <li className="if">
  <EpiLink
    className={`if crosslink link button love`}
    href={props.blok.link.url}
  >
    {props.blok.name}
  </EpiLink>
</li>;

export default Index;
