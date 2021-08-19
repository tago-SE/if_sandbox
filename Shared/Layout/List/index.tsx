import React, { ReactNode }from 'react';
import * as styles from "./list.module.scss";


type notationTypes = 'circle-black' | 'circle-white' | 'decimal';

export interface ITextListItem {
    children?: ReactNode, 
    notation?: notationTypes,
    [x: string]: any
}

export const TextListItem : React.FC<ITextListItem> = ({
    children = null,
    notation = "circle-white",
    ...props
  }) => {
    const classes = () => {
      if (notation === 'circle-white') return `${styles.whiteCircles}`;
      if (notation === 'decimal') return `${styles.decimals}`;
      return `${styles.blackBullets}`; 
    }
    return (
      <div className={classes()} {...props}>{children}</div>
    );
  }

export interface ITextList {
    children?:  Array<ITextListItem>,
    columns?: 1 | 2,
    variant?: notationTypes,
    [x: string]: any    
};

/**
 * Custom fix of list implementation used inside TextLayoutBox component.  
 */
export const TextList : React.FC<ITextList> = ({
  children = [],
  columns = 1,
  notation = "circle-black",
  ...props
}) => {
  const classes = columns > 1 ? styles.twoColumns : styles.oneColumn;
  return (
    <div className={classes} {...props}>
      {children.map( item => (<TextListItem notation={notation} {...item}/>))}
    </div>
  );
}

export default TextList;
