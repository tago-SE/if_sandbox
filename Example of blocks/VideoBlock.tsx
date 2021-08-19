import React, { ReactNode } from "react";
import EpiComponent from "helpers/epi/EpiComponent";
import VideoBlockData from "models/EpiServer/Content/VideoBlockData";
import { VideoPlayer } from "components/Shared/Layout/Video";
import { Block, Container } from "components/Shared/Layout";

export default class VideoBlock extends EpiComponent<VideoBlockData> {
  public render(): ReactNode {
    const data = this.props.data;
    const videoSource = data.videoSource.value as string;
    const title = data.videoHeader?.value as string;
    const preamble = data.videoPreamble?.value as string; 
    const imageUrl = data.image?.value?.url;
    return (
      <Block>
          <Container>
            <VideoPlayer url={videoSource} metaTitle={title} poster={{ 
              imageUrl: imageUrl, 
              title: title, 
              description: preamble 
            }}/>
          </Container>
      </Block>
    );
  }
}
