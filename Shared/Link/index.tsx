// import React, { ReactNode } from "react";
// import EpiLink from "helpers/epi/Controls/EpiLink";

// const isEmail = (url: string) => {
//   return url.includes("mailto") && url.includes("@");
// };

// const isMedia = (url: string) => {
//   return url.match(/(\.*\.(?:png|jpg|jpeg))/i);
// };

// interface IProps {
//   href: string;
//   title?: string;
//   children?: ReactNode;
//   [x: string]: any;
// }

// export const EmailLink: React.FC<IProps> = ({
//   href,
//   title = undefined,
//   children,
//   ...props
// }) => {
//   return (
//     <a href={href} title={title} className="if" {...props}>
//       {children}
//     </a>
//   );
// };

// export const MediaLink: React.FC<IProps> = ({
//   href,
//   title = undefined,
//   children,
//   ...props
// }) => {
//   return (
//     <a href={href} title={title} className="if" {...props}>
//       {children}
//     </a>
//   );
// };

// interface ILinkProps extends IProps {
//   large?: boolean;
// }

// export const Link: React.FC<ILinkProps> = ({
//   href,
//   title = undefined,
//   children = "NULL",
//   large = false,
//   ...props
// }) => {
//   if (isEmail(href)) {
//     return (
//       <EmailLink href={href} title={title} children={children} {...props} />
//     );
//   }

//   if (isMedia(href)) {
//     return (
//       <MediaLink href={href} title={title} children={children} {...props} />
//     );
//   }
//   return (
//     <EpiLink
//       href={href}
//       field="linkUrl"
//       type="button"
//       className={`if button primary${large ? " large" : ""}`}
//     >
//       {children}
//       <span
//         className="if white icon ui arrow-right"
//         style={{ marginLeft: "5px" }}
//       />
//     </EpiLink>
//   );
// };

// export default Link;
