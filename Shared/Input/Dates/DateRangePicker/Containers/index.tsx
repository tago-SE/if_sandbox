import React from "react";
import * as styles from "../date-range-picker.module.scss";

interface IDateRangeMenuContentContainerProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const DateRangeMenuContentContainer = React.forwardRef<HTMLDivElement, IDateRangeMenuContentContainerProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div className={`${styles.dateTimeRangePickerBody}${className ? " " + className : ""}`} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

export function DateRangeMenuFooter({ children, ...props }) {
  return (
    <div className={styles.footer} {...props}>
      {children}
    </div>
  );
}

export function DateRangeMenuItem({ children, ...props }) {
  return (
    <div className={styles.dateTimeRangePickerItem} {...props}>
      {children}
    </div>
  );
}
