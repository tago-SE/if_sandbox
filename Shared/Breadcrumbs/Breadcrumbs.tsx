import { IMenuNodeComposite } from "models/Navigation/MenuNodeComposite";
import Link from "next/link";
import React from "react";
import { TruncatedCrumbs } from "./TruncatedCrumbs";

export const Breadcrumbs = ({ crumbs }) => {
  const numberOfBreadCrumbs = crumbs ? crumbs.length : 0;
  if (numberOfBreadCrumbs <= 3) {
    return (
      <ol className="if breadcrumbs" data-testid="breadcrumb-ol">
        {crumbs.map((crumb: IMenuNodeComposite, index: number) => {
          return (
            <li key={index} className="if">
              <Link key={`crumb-${crumb.id}`} href={`${crumb.path}`}>
                <a className="if" title={crumb.name}>
                  {crumb.name}
                </a>
              </Link>
            </li>
          );
        })}
      </ol>
    );
  } else {
    const splitIndex = numberOfBreadCrumbs - 2;
    const truncatedLeadingCrumbs = crumbs.slice(0, splitIndex);
    const lastTwoCrumbs = crumbs.slice(splitIndex, numberOfBreadCrumbs);
    return (
      <ol className="if breadcrumbs" data-testid="breadcrumb-ol">
        <TruncatedCrumbs crumbs={truncatedLeadingCrumbs} />
        {lastTwoCrumbs.map((crumb, index) => {
          return (
            <li className="if" key={`li-${crumb.id}`}>
              <Link key={crumb.id} href={`${crumb.path}`}>
                <a className="if" title={crumb.name}>
                  {crumb.name}
                </a>
              </Link>
            </li>
          );
        })}
      </ol>
    );
  }
};

export default Breadcrumbs;
