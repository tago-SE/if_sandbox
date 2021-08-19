import React from 'react';
import ReactPlayer from 'react-player';
import { IFLoaderLarge } from 'components/Shared/If-Design-System/Loader'; // Placeholder
import VideoController, { VolumeControl, SeekerControl } from './Controls';

export interface IProps {
    url: string,
    metaTitle: string,      // Currently no working implementation, opened issue. 
    controls?: boolean,
    volume?: number,
    poster?: { image?: string, title?: string, description?: string }
}

enum VideoState {
    Unused,
    Initializing,
    Error,
    Playing,
    Paused,
    Ended,
}

const UpdateIntervalCycleInMilliseconds = 500;

export const IFVideoPlayer = ({  
    url,      
    controls = false,   
    volume = 0.75,      // number between 0 and 1.
    poster = {},
}: IProps) => {
    const [state, setState] = React.useState(VideoState.Unused);
    const [muted, setMuted] = React.useState(false);
    const [currentVolume, setVolume] = React.useState(volume);
    const [duration, setDuration] = React.useState(0);
    const [elapsedTime, setElapsedTime] = React.useState(0);
    const [reactPlayer, setReactPlayer] = React.useState(null);

    const isPlaying = () => {
        return state === VideoState.Playing;
    }

    const isPaused = () => {
        return state === VideoState.Paused;
    }

    const hasEnded = () => {
        return state === VideoState.Ended;
    }

    const isInactive = () => {
        return state !== VideoState.Paused && state !== VideoState.Playing;
    }

    const isInitializing = () => {
        return state === VideoState.Initializing;
    }
    
    const isPlayFlagSet = () => {
        return state === VideoState.Initializing || state === VideoState.Playing;
    }

    const handleVideoError = () => {
        setState(VideoState.Error);
    }

    const handleVideoStart = () => {
        setState(VideoState.Playing);
        // not working
        reactPlayer.seekTo(0.0);
        //setElapsedTime(0);
        //reactPlayer.seekTo(0.0);
    }

    const handleVideoPause = () => {
        setState(VideoState.Paused);
    }

    const handleVideoEnd = () => {
        setState(VideoState.Ended);
    }

    const handleVideoSeek = (time: any) => {
        // console.log("SEEKING", time);
        //setDuration(time);
    }

    const onDuration = (newDuration: number) => {
        setDuration(newDuration);
    };

    const onProgress = (progress: {played: number, playedSeconds: number, loaded: number, loadedSeconds: number}) => {
        if (state === VideoState.Initializing && progress.playedSeconds > 0.0) {
            setState(VideoState.Playing);
            setElapsedTime(progress.playedSeconds);
        }
        if (progress.playedSeconds !== elapsedTime) {
            setElapsedTime(progress.playedSeconds);
        }
    }

    const handleVolumeChange = (e: any) => {
        const newVolume: number = (e.target.value)/100;
        if (newVolume === currentVolume) return;
        setVolume(newVolume);
    }

    const handleProgressChange = (newElapsedTime: any) => {
        reactPlayer.seekTo(newElapsedTime);
    }

    const overlayStyles: React.CSSProperties  = {
        backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.9) 100%), url('${poster?.image}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        visibility: (isPlaying() ? "hidden" : "visible"),  
    };
    const activeOverlayStyle: React.CSSProperties  = {};
    
    const ref = (player: any) => {
        if (player && !reactPlayer) {
            setReactPlayer(player);
        }
    }

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
                    width="100%"
                    height="100%"
                    muted={muted}
                    playing={isPlayFlagSet()}
                    onEnded={handleVideoEnd}
                    onPause={handleVideoPause}
                    onError={handleVideoError}
                    onStart={handleVideoStart}
                    onSeek={handleVideoSeek}
                    volume={currentVolume}
                    controls={controls}
                    progressInterval={UpdateIntervalCycleInMilliseconds}  
                    onProgress={onProgress}
                    onDuration={onDuration}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 1,
                    }}
                />
                <div className="if overlay" style={isInactive()? overlayStyles : activeOverlayStyle}>
                    {isInitializing() ? (
                        <IFLoaderLarge isLoading={true} color={"blue"} />
                    ) : (<>
                        {poster.title && <span className="if title">{poster?.title}</span>}
                        {poster.description && <span className="if description">{poster?.description}</span>}
                        <button 
                            type="button"
                            className={`if play button secondary`} 
                            onClick={() => {
                                if (isInactive() && !hasEnded()) {
                                    setState(VideoState.Initializing);
                                } else {
                                    setState(isPlaying() ? VideoState.Paused : VideoState.Playing);
                                }
                            }}
                            style={{pointerEvents: "all"}}
                        >
                            Play
                        </button>
                    </>)}
                </div>
                <VideoController>
                    <VolumeControl 
                        label="Volume" 
                        volume={Number(currentVolume)*100} 
                        muted={muted || currentVolume <= 0} 
                        onMute={() => setMuted(true)}
                        onUnmute={() => setMuted(false)} 
                        onVolumeChange={handleVolumeChange} />
                    <SeekerControl 
                        elapsedTime={elapsedTime}
                        videoDuration={duration}
                        onChange={(arg) => {
                            handleProgressChange(arg.elapsedTimeInSeconds);
                        }}
                    />
                </VideoController>
            </div>
        </div>
        
    );
}

export default IFVideoPlayer;