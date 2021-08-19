import { ReactNode } from "react";

type spacingSize = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 68 | 72 | 76 | 80 | 84 | 88 | 92 | 96 | 100;

export interface IPadding {
    left?: spacingSize,
    right?: spacingSize,
    top?: spacingSize,
    bottom?: spacingSize,
}

export interface IMargin {
    left?: spacingSize,
    right?: spacingSize,
    top?: spacingSize,
    bottom?: spacingSize,
}

export interface ISpacing {
    padding?: IPadding,
    margin?: IMargin,
}

export const SmallestSpacing = 12;
export const SmallerSpacing = 16;
export const SmallSpacing = 28;
export const LargeSpacing = 40;
export const LargerSpacing = 80;
export const LargestSpacing = 84;

/**
 * Used to build class values for padding and margin.
 */
class SpacingBuilder {

    static buildMarginClass(margin: IMargin) {
        if (!margin) return "";
        var result = "";
        if (margin?.bottom >= 0) result += ` u-margin-bottom--${margin.bottom}`;
        if (margin?.top >= 0) result += ` u-margin-top--${margin.top}`;
        if (margin?.left >= 0) result += ` u-margin-bottom--${margin.left}`;
        if (margin?.right >= 0) result += ` u-margin-bottom--${margin.right}`;
        return result;
    }

    static buildPaddingClass(padding: IPadding) {
        if (!padding) return "";
        var result = "";
        if (padding?.bottom >= 0) result += ` u-padding-bottom--${padding.bottom}`;
        if (padding?.top >= 0) result += ` u-padding-top--${padding.top}`;
        if (padding?.left >= 0) result += ` u-padding-bottom--${padding.left}`;
        if (padding?.right >= 0) result += ` u-padding-bottom--${padding.right}`;
        return result;
    }

    static buildSpacingClass(spacing: ISpacing) {
        if (!spacing) return "";
        return this.buildPaddingClass(spacing.padding) + this.buildMarginClass(spacing.margin);
    }
}

/**
 * Flexible way to wrap padding and margin around an existing component without modifying the style.
 * 
 * Example:
 * <Spacing spacing={ { margin: {bottom: 24}, padding: {left: 100} } } children={null} />
 */
export const Spacing: React.FC<{
    children: ReactNode,
    spacing: ISpacing,
}> = ({
    children,
    spacing,
    ...props
}) => {
    
    return (
        <div className={`if ${SpacingBuilder.buildSpacingClass(spacing)}`} {...props}>{children}</div>
    );
}

export default SpacingBuilder;

