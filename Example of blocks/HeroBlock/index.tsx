import React, { ReactNode } from "react";
import HeroBlockData from "models/EpiServer/Content/HeroBlockData";
import ContentArea from "helpers/epi/Controls/ContentArea";
import EpiLink from "helpers/epi/Controls/EpiLink";
import Property from "helpers/epi/Controls/Property";
import EpiComponent from "helpers/epi/EpiComponent";
import Hero, { HeroImage } from "components/Shared/Hero";
import { colorblock } from "./HeroBlock.module.scss";

export default class HeroBlock extends EpiComponent<HeroBlockData> {
  public render(): ReactNode {
    return <HeroView data={this.props.data} />;
  }
}

export const HeroView: React.FC<{ data: HeroBlockData }> = ({ data }) => {
  const hasHeading = data.heading?.value != null;
  const heading = hasHeading && <Property iContent={data} field="heading" />;
  const hasImage = data.image?.value != null;
  let heroImageClassName = "lifestyle";
  let imageName = data.image?.value?.name?.toLowerCase();
  if (imageName) {
    if (imageName.includes("-studio") || imageName.includes(" studio")) heroImageClassName = "studio";
    else heroImageClassName = "lifestyle"; // Restricted & Editorial images should not be used for hero blocks.
  }
  const heroImage = hasImage && (
    <Property
      iContent={data}
      field="image"
      templateComponent={<HeroImage classNames="studio" alt={data.imageAlt.value} />}
    />
  );
  const introText = <Property iContent={data} field="introText" />;
  const linkButtonText = <Property iContent={data} field="linkButtonText" />;

  let extraContentArea = null;
  if (data.extraContentArea?.value?.length > 0) {
    extraContentArea = (
      <ContentArea key="extraContentArea" data={data.extraContentArea} propertyName="extraContentArea" noWrap />
    );
  }

  const heroButton = data.linkUrl?.value && (
    <EpiLink href={data.linkUrl.value} field="linkUrl" type="button" className={`if button primary large`}>
      {linkButtonText}
    </EpiLink>
  );

  const navigationContainer = (
    <>
      {heroButton}
      {extraContentArea}
    </>
  );

  return (
    <Hero
      title={heading}
      image={heroImage}
      lead_text={introText}
      navigationContainer={navigationContainer}
      backgroundColor={`lightBeige ${colorblock}`}
      headingSize="medium"
      breadCrumbs={false}
    />
  );
};
