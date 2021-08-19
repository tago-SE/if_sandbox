import React, { ReactNode } from 'react';

// TO-DO: Use Module import
import VolumeControl from './VolumeControl';
import SeekerControl from './SeekerControl';

/**
 * TODO: Implement other control elements
 */
interface IProps {
    children?: ReactNode,
}

export const VideoController = ({  
    children = undefined,
}: IProps) => {
    return (
        <div className="if controls">
            {children}

            {/* <div className="if subtitles-control">
                <button type="button" className="if subtitles button">
                    <span className="if description">Subtitles</span>
                </button>
                <div className="if menu bottom right">
                    <ul className="if">
                        <li className="if">
                            <button id="if-video-0-subtitles-off" className="if" value="Off" data-state="inactive">Off</button>
                        </li>
                        <li className="if separator"></li>
                        <li className="if">
                            <button id="if-video-0-subtitles-en" className="if" lang="en" value="English" data-state="inactive">English</button>
                        </li>
                        <li className="if"><button id="if-video-0-subtitles-no" className="if" lang="no" value="Norsk" data-state="inactive">Norsk</button></li>
                        <li className="if"><button id="if-video-0-subtitles-dk" className="if" lang="dk" value="Dansk" data-state="inactive">Dansk</button>
                        </li><li className="if"><button id="if-video-0-subtitles-se" className="if" lang="se" value="Svenska" data-state="inactive">Svenska</button></li></ul>
                </div>
            </div> */}
            {/* <div className="if seeker-control">
                <span className="if js-seeker-time-elapsed">00:00</span>
                <progress className="if seeker js-seeker-control" value="0.6186898793333436" min="0" max="100"></progress>
                <span className="if js-seeker-time-remaining">-02:07</span>
            </div> */}
            {/* <div className="if cc-control">
            <button type="button" className="if cc button"><span className="if description">Captions</span></button>
            <div className="if menu bottom right"><ul className="if"><li className="if"><button id="if-video-0-captions-off" className="if" value="Off" data-state="inactive">Off</button></li><li className="if separator"></li><li className="if"><button id="if-video-0-captions-en" className="if" lang="en" value="English" data-state="inactive">English</button></li><li className="if"><button id="if-video-0-captions-no" className="if" lang="no" value="Norsk" data-state="inactive">Norsk</button></li></ul></div></div>
            <div className="if quality-control">
            <button type="button" className="if quality button">
                <span className="if js-video-quality">Full HD</span><span className="if description">Quality</span>
            </button>
            <div className="if menu bottom left"><ul className="if"><li className="if"><button id="if-video-0-quality-1080p" className="if" quality="1080p" data-state="inactive" value="1080p">Full HD (1080p)</button></li><li className="if"><button id="if-video-0-quality-720p" className="if" quality="720p" data-state="inactive" value="720p">HD (720p)</button></li><li className="if"><button id="if-video-0-quality-480p" className="if" quality="480p" data-state="inactive" value="480p">SD (480p)</button></li><li className="if"><button id="if-video-0-quality-240p" className="if" quality="240p" data-state="inactive" value="240p">Mobile (240p)</button></li><li className="if separator"></li><li className="if"><button id="if-video-0-quality-automatic" className="if is-active" data-state="active" quality="1080p" value="1080p">Automatic (1080p)</button></li></ul></div></div> */}
        </div>  
    );
}

export { VolumeControl, SeekerControl };
export default VideoController;