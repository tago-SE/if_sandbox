import React, { ReactNode } from "react";
import ContentArea from "helpers/epi/Controls/ContentArea";
import EpiComponent from "helpers/epi/EpiComponent";
import UspListBlockData from "models/EpiServer/Content/UspListBlockData";
import { Block, Container } from "components/Shared/Layout";
import { UspList, IUspListProps } from "components/Shared/Usps/UspList";

export default class UspListBlock extends EpiComponent<UspListBlockData> {
  public render(): ReactNode {
    const uspLstProp: IUspListProps = {
      alignment: this.props.data?.alignLeft?.value ? "left" : "center",
      vertical: this.props.data?.alignVertical?.value
    };
    return (
      <Block>
        <Container>
          <ContentArea
            key="uspsContentArea"
            data={this.props.data.uspsContentArea}
            propertyName="uspsContentArea"
            noWrap
            groupComponent={UspList}
            parentProps={uspLstProp}
          />
        </Container>
      </Block>
    );
  }
}
