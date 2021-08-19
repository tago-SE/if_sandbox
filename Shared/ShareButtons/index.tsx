import React from "react";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";
import { CustomButton } from "components/Shared/Buttons/CustomButton";
// import './sharebuttons.module.scss';
import * as styles from "./sharebuttons.module.scss";

export interface IShareButtons {
  /** Url of the link being shared */
  url: string;

  /** Optional window width of the shared window */
  // windowWidth?: number, (did not test)

  /** Optional window height of the share window */
  // windowHeight?: number, (did not test)

  /** Quote or text used to describe what is being shared */
  quote?: string;

  /** The twitter site or user that is sharing the content. */
  twitterHandle: string;

  /** Hashtags that are used for sharing. Some companies only accept 1 hashtag, in those cases the first is used. */
  hashtags: string[];

  /** Option for aligning the buttons either horizontally or vertically */
  variant?: "row" | "column";

  /** Adds underline when the user hoovers over the button  */
  focusable?: boolean;

  [x: string]: any;
}
/**
 * https://codesandbox.io/s/react-spring-transition-with-messages-forked-p8r2s?file=/src/SubShare/index.js
 */
export const ShareButtons: React.FC<IShareButtons> = ({
  url,
  // windowWidth,
  // windowHeight,
  quote = "",
  twitterHandle = "",
  hashtags = [],
  variant = "row",
  focusable = false,
  ...props
}) => {
  const className = variant === "row" ? styles.horizontalShareButtons : styles.verticalShareButtons;
  const buttonClassName = `if button tertiary ${styles.button}`;
  return (
    <div className={className} {...props}>
      <FacebookShareButton
        className={buttonClassName}
        url={url}
        quote={quote}
        hashtag={String(hashtags.length > 0 ? hashtags[0] : "")}
      >
        <div className={`if icon some facebook ${styles.icon} ${focusable ? " focusable" : ""}`} />
      </FacebookShareButton>
      <TwitterShareButton
        className={buttonClassName}
        url={url}
        title={quote}
        via={twitterHandle}
        hashtags={hashtags.map((hashtag) => String(hashtag))}
      >
        <div className={`if icon some twitter ${styles.icon}${focusable ? " focusable" : ""}`} />
      </TwitterShareButton>
      <LinkedinShareButton className={buttonClassName} url={url}>
        <div className={`if icon some linkedin ${styles.icon}${focusable ? " focusable" : ""}`} />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButtons;
