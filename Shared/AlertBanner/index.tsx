import React, { useEffect, useState } from "react";
import TransitionWrapper from "../TransitionWrapper";

const notificationTypes = ["success", "warning", "error", "info"];
const defaultType = "info";
const notificationHeadingSize = ["smallest", "smaller", "small", "large", "larger", "largest"];
const defaultHeadingSize = "smallest";

export const AlertBanner = ({
  onClose = null,
  type = "",
  title = "",
  titleSize = defaultType,
  link = null,
  dissmisable = false,
  dissmisableTooltip = "Close",
  timeVisible = 10000,
  ...props
}) => {
  const style: React.CSSProperties = props.style;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (onClose) onClose();
    }, timeVisible + 1000);
  }, [timeVisible]);

  return (
    <TransitionWrapper timeout={timeVisible}>
      <div
        className={`if alert-banner ${notificationTypes.includes(type) ? type : defaultType}`}
        style={style ? style : null}
      >
        <span className={`if heading ${notificationHeadingSize.includes(titleSize) ? titleSize : defaultHeadingSize}`}>
          {title}
        </span>
        <p style={{ margin: 0 }}>{props.children}</p>
        {link} {/* Expected className of link: class="if standalone"> */}
        {dissmisable ? (
          <button onClick={() => handleClose()} type="button" className="if close" style={{ cursor: "pointer" }}>
            <span className="if axe sr-only">{dissmisableTooltip}</span>
          </button>
        ) : null}
      </div>
    </TransitionWrapper>
  );
};

export const InfoAlertBanner = ({
  title = "",
  titleSize = defaultType,
  link = null,
  dissmisable = true,
  dissmisableTooltip = "Close",
  timeVisible = null,
  ...props
}) => {
  return (
    <AlertBanner
      type="info"
      title={title}
      titleSize={titleSize}
      link={link}
      dissmisable={dissmisable}
      dissmisableTooltip={dissmisableTooltip}
      timeVisible={timeVisible}
      {...props}
    >
      {props.children}
    </AlertBanner>
  );
};

export const SuccessAlertBanner = ({
  title = "",
  titleSize = defaultType,
  link = null,
  dissmisable = true,
  dissmisableTooltip = "Close",
  ...props
}) => {
  return (
    <AlertBanner
      type="success"
      title={title}
      titleSize={titleSize}
      link={link}
      dissmisable={dissmisable}
      dissmisableTooltip={dissmisableTooltip}
      {...props}
    >
      {props.children}
    </AlertBanner>
  );
};

export const WarningAlertBanner = ({
  title = "",
  titleSize = defaultType,
  link = null,
  dissmisable = true,
  dissmisableTooltip = "Close",
  ...props
}) => {
  return (
    <AlertBanner
      type="warning"
      title={title}
      titleSize={titleSize}
      link={link}
      dissmisable={dissmisable}
      dissmisableTooltip={dissmisableTooltip}
      {...props}
    >
      {props.children}
    </AlertBanner>
  );
};

export const ErrorAlertBanner = ({
  title = "",
  titleSize = defaultType,
  link = null,
  dissmisable = true,
  dissmisableTooltip = "Close",
  ...props
}) => {
  return (
    <AlertBanner
      type="error"
      title={title}
      titleSize={titleSize}
      link={link}
      dissmisable={dissmisable}
      dissmisableTooltip={dissmisableTooltip}
      {...props}
    >
      {props.children}
    </AlertBanner>
  );
};
