import Contact from "components/Shared/Contact";
import Property from "helpers/epi/Controls/Property";
import HeadingBlockData from "models/EpiServer/Content/HeadingBlockData";
import React, { ReactNode } from "react";
import EpiComponent from "../../../helpers/epi/EpiComponent";
import { Heading, HeadingRanks, getHeadingRank } from "components/Shared/Typography/Heading";
import { Block, BlockVariants, Container } from "components/Shared/Layout";

/**
 * Tentative block, used as an alternative to a hero.
 */
export default class HeadingBlock extends EpiComponent<HeadingBlockData> {
  public render(): ReactNode {
    const data = this.props.data;
    const text = <Property iContent={data} field="text" />;
    const alignCenter = data.center?.value;
    const size = data.size?.value;
    const rank = getHeadingRank(size) as HeadingRanks;
    const hasUnderline = data.includeUnderline?.value;
    const backgroundColor = data.backgroundColor?.value as BlockVariants;
    return (
      <Block style={{ paddingBottom: "0px" }} variant={backgroundColor}>
        <Container>
          <Heading rank={rank || 1} center={alignCenter} style={hasUnderline ? { marginBottom: "20px" } : undefined}>
            {text}
          </Heading>
          {hasUnderline && <hr className="if" />}
        </Container>
      </Block>
    );
  }
}
