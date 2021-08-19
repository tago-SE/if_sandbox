import React from 'react';

interface ILifestyleProps {
    href: string
    title: any,
    image?: any,
    [x: string]: any,
}

export const LifestyleCrosslink: React.FC<ILifestyleProps> = ({
    title,
    href,
    image = undefined,
    ...props
}) => {
    return (
        <li className="if" role="presentation" {...props}>
            <a className="if crosslink image" href={href}>
                {image}
                <p className="if text body">{title}</p>
            </a>
        </li>
    );
}

const COLUMNS = ["", "one", "two", "three", "four"];

interface ILifestyleContainerProps {
    children: any,
    role?: string,
    columns?: 1 | 2 | 3 | 4,
    [x: string]: any,
}

export const LifestyleCrosslinkContainer: React.FC<ILifestyleContainerProps> = ({
    children = null,
    columns = 0,
    ...props
}) => {
    return (<ul role="presentation" className={`if crosslinks lifestyle ${COLUMNS[columns]}`} {...props}>{children}</ul>);
}