import React from "react";
export interface IImage {
  imgSrc?: string;
  alt?: string;
  title?: string;
  classNames?: string;
  [x: string]: any;
}
const Index = ({imgSrc, title, classNames, dataattrs}:IImage) => <div {...dataattrs} role="img" aria-label={title} className={`${classNames}`} style={{backgroundImage:`url(${imgSrc})`,height:80,width:400,backgroundSize:'contain', backgroundRepeat:'no-repeat'}}></div>;
export default Index;