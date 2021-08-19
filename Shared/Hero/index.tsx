import React from "react";
import { useRouter } from "next/router";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { observer } from "mobx-react";
import { useAppContext } from "context/AppContext";

interface HeroProps {
  title;
  image?;
  lead_text?;
  navigationContainer;
  backgroundColor?;
  headingSize?;
  breadCrumbs: boolean;
}

const Hero = observer(
  ({ title, image, lead_text, navigationContainer, backgroundColor, headingSize, breadCrumbs }: HeroProps) => {
    const background = backgroundColor ? `color background ${backgroundColor}` : "";
    const heading = headingSize ? headingSize : "large";
    const appContext = useAppContext();
    const { navigationStore } = appContext.stores;
    return (
      <section className={`if hero reverse ${background}`}>
        <div className="if container">
          {breadCrumbsControl(breadCrumbs, navigationStore)}
          <div className="if content">
            <h1 className={`if heading ${heading}`}>{title}</h1>
            {lead_text}
            {navigationContainer}
          </div>
          {image}
        </div>
      </section>
    );
  }
);

export const HeroColumn = observer(
  ({ title, image, lead_text, navigationContainer, headingSize, breadCrumbs }: HeroProps) => {
    const heading = headingSize ? headingSize : "large";
    const appContext = useAppContext();
    const { navigationStore } = appContext.stores;
    return (
      <section className={`if hero column`}>
        <div className="if container">
          {breadCrumbsControl(breadCrumbs, navigationStore)}
          <div className="if content">
            {image}
            <h1 className={`if heading ${heading}`}>{title}</h1>
            {lead_text}
            {navigationContainer}
          </div>
        </div>
      </section>
    );
  }
);

const breadCrumbsControl = (breadCrumbs, navigationStore) => {
  if (breadCrumbs) {
    return navigationStore.menu ? (
      <Breadcrumbs crumbs={navigationStore.getBreadcrumbs(window?.location ? window?.location?.pathname : "")} />
    ) : null;
  }
  return null;
};

export const HeroImage: React.FC<{
  classNames: "lifestyle" | "studio";
  style?: React.CSSProperties;
  [x: string]: any;
}> = ({ style = {}, classNames = "lifestyle", ...props }) => {
  return (
    <div
      className={`if image ${classNames}`}
      style={{
        backgroundImage: `url(${props.imgSrc})`,
        ...style
      }}
      {...props.dataattrs}
      role="img"
      aria-label={props.alt}
    ></div>
  );
};

export default Hero;
