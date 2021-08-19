import React from 'react';

export interface IFigure {
    image: any,
    caption?: any,
    [x: string]: any
  };

export const Figure : React.FC<IFigure> = ({
    image,
    caption = undefined,
    ...props
}) => {
    return (
        <figure className="if" {...props}>
            {image}
            {caption && <figcaption className="if text caption">{caption}</figcaption>}
        </figure>
    );
}

export default Figure;
