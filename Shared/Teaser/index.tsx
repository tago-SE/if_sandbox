import React from "react";
import { Image } from 'components/Shared/Image';

export { Image as TeaserImage };

interface TeaserProps {
  header: any;
  image: any;
  content: any;
  actionElement: any;
}

export const Teaser = ({ header, image, content, actionElement }: TeaserProps) => (
  <li className="if teaser">
    {image}
    <span className="if heading smallest">{header}</span>
    {content}
    {actionElement}
  </li>
);

export const TeaserList = ({children, ...props}) =>{
  return <ul className="if teasers" {...props}>{children}</ul>
}

export const TeaserLink = ({href, linkText}) =>{
  return <a href={href} className="if standalone">{linkText}</a>
}

export const TeaserButton = ({href, linkText}) =>{
  return <a href={href} type="button" className="if button primary">{linkText}</a>
}

export default Teaser;