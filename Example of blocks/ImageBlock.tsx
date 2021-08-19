import React, { ReactNode } from "react";
import EpiComponent from "helpers/epi/EpiComponent";
import { Block, Container } from "components/Shared/Layout";
import Property from "helpers/epi/Controls/Property";
import { Image } from "components/Shared/Image";
import { Figure } from "components/Shared/Layout/Figure";
import ImageBlockData from "models/EpiServer/Content/ImageBlockData";

export default class FigureBlock extends EpiComponent<ImageBlockData> {
  public render(): ReactNode {
    const data = this.props.data;
    return (
      <Block>
          <Container>
            <Figure 
              image={<Property 
                iContent={data} field="image" 
                templateComponent={<Image alt={data.imageAlt.value} />} 
              />}
              caption={<Property iContent={data} field="imageCaption"/>}
            />
          </Container>
      </Block>
    );
  }
}
