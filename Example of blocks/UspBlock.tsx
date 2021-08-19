import React, { ReactNode } from "react";
import Property from "helpers/epi/Controls/Property";
import EpiComponent from "helpers/epi/EpiComponent";
import UspBlockData from "models/EpiServer/Content/UspBlockData";
import { UspItem } from "components/Shared/Usps/UspItem";

export default class UspBlock extends EpiComponent<UspBlockData> {
  public render(): ReactNode {
    const header = <Property iContent={this.props.data} field="header" />;
    const content = (
      <Property iContent={this.props.data} field="content" className="if" />
    );
    return (
      <UspItem
        content={content}
        header={header}
        iconClassName={this.props.data.icon?.value}
      />
    );
  }
}
