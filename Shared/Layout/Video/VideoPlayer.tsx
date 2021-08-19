import React from 'react';
import ReactPlayer from 'react-player';
import { IFLoaderLarge } from 'components/Shared/If-Design-System/Loader';

export interface IProps {
    url: string,
    metaTitle: string,           // Currently no working implementation, opened issue. 
    controls?: boolean,
    playButtonLabel?: string,
    volume?: number,
    poster?: { imageUrl?: string, title?: string, description?: string }
}

enum VideoState {
    Unused,
    Initializing,
    Error,
    Playing,
    Paused,
    Ended,
}

interface IProgress { played: number, playedSeconds: number, loaded: number, loadedSeconds: number };

const DefaultProgress: IProgress = { played: 0, playedSeconds: 0, loaded: 0, loadedSeconds: 0};

// Change with care, some properties can cause unexpected behaviour in how the player functions
const PlayerConfig = { 
    youtube: { 
        playerVars: { 
            modestbranding: 1,        // hide youtube branding, does not work for all colors
            fs: 1,                    // allow fullscreen toggle
        }
    } 
};

export const VideoPlayer = ({  
    url,
    metaTitle,
    controls = true,
    playButtonLabel = "Play",
    volume = 0.75,      // number between 0 and 1.
    poster = {},
}: IProps) => {
    const [state, setState] = React.useState({
        videoState: VideoState.Unused,
        videoProgress: DefaultProgress,
        stopTimestamp: 0.0,
    });
    const [reactPlayer, setPlayer] = React.useState(null);

    const { videoState }  = state;

    const isPlaying = () => {
        return videoState === VideoState.Playing;
    }

    const isPaused = () => {
        return videoState === VideoState.Paused;
    }

    const hasEnded = () => {
        return videoState === VideoState.Ended;
    }

    const isInactive = () => {
        return videoState !== VideoState.Paused && videoState !== VideoState.Playing;
    }

    const isInitializing = () => {
        return videoState === VideoState.Initializing;
    }
    
    const isPlayFlagSet = () => {
        return videoState === VideoState.Initializing || videoState === VideoState.Playing;
    }

    const onPlayerError = () => {
        console.warn("Developer notice: not tested state");
        setState({ ...state, videoState: VideoState.Error });
    }

    const onPlayerStart = () => {
        setState({ ...state, videoState: VideoState.Playing });
    }

    const onPlayerPause = () => {
        const timestamp = reactPlayer.getCurrentTime();
        setState({ ...state, videoState: VideoState.Paused, stopTimestamp: timestamp });
    }

    const onPlayerEnded = () => {
        const elapsed = reactPlayer.getCurrentTime();
        const duration = reactPlayer.getCurrentTime();
        if (Math.round(duration) === Math.round(elapsed)) {
            setState({ ...state, videoState: VideoState.Ended, stopTimestamp: elapsed });
        }
    }

    const onPlayerBuffer = () => {
        // Not implemented
    }

    const onPlayerBufferEnd = () => {
        // Not implemented
    }

    const ref = (player: any) => {
        if (player && !reactPlayer) {
            setPlayer(player);            // We get the react-player at the first run to acccess api
        }
    }

    const onPlayerProgress = (progress: {played: number, playedSeconds: number, loaded: number, loadedSeconds: number}) => {
        if (videoState === VideoState.Unused) {
            return;
        }
        if ((videoState === VideoState.Initializing && progress.playedSeconds > 0.0)) {
            setState({ ...state, videoState: VideoState.Playing, videoProgress: progress });
            return;
        }
        const timestamp = reactPlayer.getCurrentTime();
        if ((isPaused() || hasEnded()) && timestamp === state.stopTimestamp) {
            return; 
        }
        // The assumption is that every other callback should be fired only when playing. 
        // This may be wrong when its stuck in loading or an error occurs... We'll see.
        setState({ ...state, videoState: VideoState.Playing, videoProgress: progress });
    }

    const handlePlayButtonClick = () => {
        if (isInactive() && !hasEnded()) {
            setState({ ...state, videoState: VideoState.Initializing });
        } 
        else if (isPaused() || hasEnded()) {
            setState({ ...state, videoState: VideoState.Playing });
        } else {
            setState({ ...state, videoState: VideoState.Paused });
        }
    }

    const posterOverlayStyle: React.CSSProperties  = {
        backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.9) 100%), url('${poster?.imageUrl}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        visibility: (isPlaying() ? 'hidden': 'visible'),  
    };
    const activeOverlayStyle: React.CSSProperties  = {
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 100%)',
        pointerEvents: 'none', // allow click through
    };
    return (
        <div className="if image live">
            <div className={`if video${isPlaying() ? " is-active" : (isPaused() ? " is-paused" : "")}`}
                style={{
                    position: "relative",
                    paddingBottom: "56.25%" /* 16:9 */,
                    paddingTop: 25,
                    height: 0
                }}  
            >
                <ReactPlayer
                    ref={ref}
                    url={url}
                    className="react-player"
                    controls={controls}
                    volume={volume}
                    width="100%"
                    height="100%"
                    config={PlayerConfig}
                    playing={isPlayFlagSet()}
                    onEnded={onPlayerEnded}
                    onPause={onPlayerPause}
                    onError={onPlayerError}
                    onStart={onPlayerStart}
                    onProgress={onPlayerProgress}
                    onBuffer={onPlayerBuffer}
                    onBufferEnd={onPlayerBufferEnd}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 1,
                    }}
                />
                <div className="if overlay" style={isInactive()? posterOverlayStyle : activeOverlayStyle}>
                    {isInitializing() ? (
                        <IFLoaderLarge isLoading={true} color={"blue"} />
                    ) : (<>
                        {poster.title && <span className="if title">{poster?.title}</span>}
                        {poster.description && <span className="if description">{poster?.description}</span>}
                        <button 
                            type="button"
                            className={`if play button secondary`} 
                            onClick={handlePlayButtonClick}
                            style={{pointerEvents: "all"}}
                        >
                            {playButtonLabel}
                        </button>
                    </>)}
                </div>
            </div>
        </div>
    );
}