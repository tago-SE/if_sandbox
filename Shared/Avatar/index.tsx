import React from 'react';
 
/**
 * TODO...
 */
interface IPops {
    size?: "small" | "medium" | "large" | "larger" | "largest",
    color?: string,
    imageSrc?: string,
    [x: string]: any,
}

export const Avatar: React.FC<IPops> = ({
    size = "large",
    color = "",
    imageSrc = undefined,
    ...props
}) => {
    return (
        <span 
            className={`if avatar ${size}`} 
            style={{ backgroundImage: `url(${imageSrc})`}}
            {...props}
        />
    );
}

export default Avatar;
