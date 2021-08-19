import React from "react";
import * as styles from "./custom-crosslink.module.scss";
import { Icon } from "components/Shared/Icon";

interface ICustomCrosslinkProps {
  links: Array<ILink>;
  title: any;
  description?: any;
  variant?: "darker" | "light";
  iconClassName?: string;
  [x: string]: any;
}

interface ILink {
  title: any;
  href: string;
  [x: string]: any;
}

/**
 * Custom crosslink button with two icons.
 */
export const CustomCrossLink: React.FC<ICustomCrosslinkProps> = ({
  title,
  links,
  text = null,
  variant = "light",
  iconClassName = "symbol curve-directions",
  ...props
}) => {
  return (
    <li role="presentation" className={`if ${styles.listItem}`} {...props}>
      <a
        className={`if crosslink ${variant === "darker" ? styles.customcrosslinkdark : styles.customcrosslinklight}`}
        href={links?.length > 0 ? links[0]?.href : ""}
      >
        {iconClassName && (
          <div className={styles.customicontop}>
            <Icon className={iconClassName} color="brown" size="medium" />
          </div>
        )}
        <p className={`if text lead ${styles.customcrosslinkTitle}`}>
          <span className="if">{title}</span>
        </p>
        {text && <p className={`if text body ${styles.customcrosslinkText}`}>{text}</p>}
        {
          <div className={`${styles.customLinkWrapper}`}>
            {links?.map((link: ILink, index: number, array: any) => {
              return array.length === 1 ? (
                <div key={index} className={`${styles.customIconWrapper}`}>
                  <Icon className="ui arrow-right" color="blue" size="medium" />
                </div>
              ) : (
                <a key={index} className={`if standalone ${styles.customStandaloneLink}`} href={link.href}>
                  {link.title}
                </a>
              );
            })}
          </div>
        }
      </a>
    </li>
  );
};

interface ICustomCrosslinkContainerProps {
  children?: any;
  role?: string;
  [x: string]: any;
}

export const CustomCrosslinkContainer: React.FC<ICustomCrosslinkContainerProps> = ({
  children = null,
  role = "presentation",
  ...props
}) => {
  return (
    <ul role={role} data-anatomy="outline right" className={`if ${styles.custContainer}`} {...props}>
      {children}
    </ul>
  );
};
