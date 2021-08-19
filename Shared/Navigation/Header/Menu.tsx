import React from 'react';

// Not Implemented features: 
//
// - Use `aria-posinset` to indicate which position in the set the menu item is.
// - Use `aria-expanded` on menu items that are expandable/have a menu.
// - Use `aria-labelledby` / `aria-label` on sub menus.

export const MenuList = ({
    isOpen=false, 
    className="",
    ...props
}) => {
    return (<ul className={`if${className.length > 0 ? ` ${className}` : ""}${(isOpen ? " is-open" : "")}`} {...props}>
        {props.children}
    </ul>);
};

export const MenuListItem = ({
    isParent=false, 
    isActive=false, 
    isOpen=false, 
    className="", 
    ...props
}) => {
    return (<li className={`if${className.length > 0 ? ` ${className}` : ""}${(isParent ? " is-parent" : "")}${(isOpen ? " is-open" : "")}${(isActive ? " is-active" : "")}`} {...props}>
        {props.children}
    </li>);
};

export const MenuContainer = ({
    isParent=false, 
    isOpen=false, 
    className="",
    children = null,
    ...props
}) => {
    return (<div className={`if${className.length > 0 ? ` ${className}` : ""}${(isParent ? " is-parent" : "")}${(isOpen ? " is-open" : "")}`} {...props}>
        {children}
    </div>);
};

export const SubMenuItem = ({
    labelText="undefined",
    className="", 
    onClick=null, 
    isActive=false, 
    isOpen=false,    
    buttonClassName="", 
    iconSpan=null,
    menuClassName="menu", 
    menuListClassName="",
    ...props
}) => {
    const handleClick = (e: any) => {
        if (onClick) onClick(e);
    };
    return (
        <MenuListItem className={className} isParent={true} isActive={isActive} isOpen={isOpen} >
            <button type="button" className={`if ${buttonClassName}`} onClick={handleClick}> 
                {iconSpan}
                {labelText}
            </button>
            <MenuContainer className={menuClassName} isOpen={isOpen || isActive}>
                <MenuList className={menuListClassName} isOpen={isOpen}>
                    {props.children}
                </MenuList>
            </MenuContainer>
        </MenuListItem>
    );
};
