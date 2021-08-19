import React, { ReactNode } from 'react';
import { Container } from '../Layout/Container';
import { Image, IImage } from '../Image';
import { TextBody } from '../Layout/TextLayout';
import { Heading, IHeadingProps } from '../Typography/Heading';

export interface ISplit {
    content: any;
    image?: ReactNode;
    small?: boolean;
    reverse?: boolean,
    color?: '' | 'dark' | 'darker' | 'darkest';
    [x: string]: any;
};

/**
 *  The Split Component is used to divide up content heavy pages. It consists of a content section and a featued section typically an image or a video. 
 */
export const Split : React.FC<ISplit> = ({
    content,
    image = undefined,
    youtube = undefined,
    small = false, 
    reverse = false,
    color = "",
    ...props
}) => {
    return (
        <div data-speccer="" className={`if split${small ? " small" : ""}${color ? " " + color : ""}${reverse ? " reverse" : ""}`} {...props}>
            <Container>
                {content}
                {image}
            </Container>
        </div>
    );
}

export interface ISplitContent {
    heading?: ReactNode,
    body?: ReactNode,
    footer?: ReactNode,
}

export const SplitContent : React.FC<ISplitContent> = ({
    body = undefined,
    heading = undefined,
    footer = undefined,
    ...props
}) => {
    return (
        <div className="if content" {...props}>
            {heading}
            <TextBody>{body}</TextBody>
            {footer}
        </div>
    );
}

interface ISplitContentContainer {
    children,
    [x: string]: any,
}

export const SplitContentContainer = ({children, props} : ISplitContentContainer) => {
    return (<div className="if content" {...props}>{children}</div>);
}

export const SplitImage = (props) => {
    return (
      <div
        className="if image"
        style={{
          backgroundImage: `url(${props.imgSrc})`,
        }}
        {...props.dataAttrs}
        role="img"
        aria-label={props.alt}
      />
    );
  };
  