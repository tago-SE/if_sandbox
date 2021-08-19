import React from "react";
import * as styles from "./article.module.scss";
import { EpiLink as Link } from "helpers/epi/Controls/EpiLink";

export interface ArticleCardProps {
  title: any;
  href: string;
  image: any;
  text?: any;
  categoryName?: string;
  author?: string;
  tags?: any;
  dateTime?: string;
  likes?: number;
  comments?: number;
  variant?: "" | "across" | "list";
  reverse?: boolean;
  style?: React.CSSProperties;
}

export const ArticleCard = React.forwardRef<HTMLLIElement, ArticleCardProps>((props, ref) => {
  const shouldHideLikesAndcomments = () => {
    return !(props.likes || props.comments);
  };
  return (
    <li
      className={`if editorial-card ${props.reverse ? "reverse " : ""}article ${props.variant}`}
      style={props.style}
      ref={ref}
    >
      <div className={`if content ${styles.content}`}>
        {props.categoryName ? <span className="if category">{props.categoryName}</span> : null}
        <h3 className="if title heading smallest">
          <Link href={props.href} className="if">
            {props.title}
            <span className="if inline-nowrap">
              ﻿<span className="if icon ui arrow-right" />
            </span>
          </Link>
        </h3>
        <div className="if preview">{props.text}</div>
        <div className={`if meta`}>
          {props.tags}
          {props.author && <small className={`if author text meta`}>{props.author}</small>}
          <small className="if extras">
            {shouldHideLikesAndcomments() ? (
              <time className="if" style={{ borderRight: "none" }}>
                {props.dateTime}
              </time>
            ) : (
              <>
                <time className="if">{props.dateTime}</time>
                <span className="if likes">{props.likes}</span>
                <span className="if comments">{props.comments}</span>
              </>
            )}
          </small>
        </div>
      </div>
      {props.image}
    </li>
  );
});
