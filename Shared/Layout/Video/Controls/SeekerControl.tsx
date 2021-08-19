import React from 'react';

interface IProps {
    elapsedTime: number,
    videoDuration: number,
    onChange: any,
}

export interface IProgressChangeEvent {
    elapsedTimeInSeconds: number 
}
/*
    if (seekerRange) {
      video.addEventListener('timeupdate', () => {
        if (video.currentTime != 0 && !isNaN(video.duration)) {
          seekerRange.value = (video.currentTime / video.duration) * seekerRange.max;
          seekerElapsed.textContent = createMediaTimestamp(parseInt(video.currentTime));
          seekerRemaining.textContent = `-${createMediaTimestamp(parseInt(video.duration - video.currentTime))}`;
        }
      });
  
      seekerRange.addEventListener('click', function(e) {
        const clickedValue = (e.offsetX * this.max) / this.offsetWidth;
  
        video.currentTime = (video.duration * clickedValue) / seekerRange.max;
        seekerElapsed.textContent = createMediaTimestamp(parseInt(video.currentTime));
        seekerRemaining.textContent = `-${createMediaTimestamp(parseInt(video.duration - video.currentTime))}`;
      });
    }
    */

function strPadLeft(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

/*
<input 
                className="if volume volume-control" type="range" value={volume} min={0} max={100} step={10}
                //onMouseLeave={() => setActive(false)}
                onChange={onVolumeChange}
                // css={css`
                //     /* color: hotpink; */
                //     border-color: red;
                //     background-color: green;
                // `}
            //     style={{ backgroundImage: 
            //         `linear-gradient(to right, rgb(250, 249, 247) 0%, rgb(250, 249, 247) ${volume}%, rgb(110, 98, 94) 44%, rgb(110, 98, 94) 100%)`}}

            // />
            // */

const createMediaTimestamp = timeInSeconds => {
    var seconds = Math.floor(timeInSeconds % 60);
    var minutes = Math.floor(timeInSeconds / 60);
    return strPadLeft(minutes, '0', 2) + ':' + strPadLeft(seconds, '0', 2);
};

const SeekerControl = ({ 
    elapsedTime,
    videoDuration, 
    onChange: onProgressChange,
}: IProps) => {
    //  (video.currentTime / video.duration) * seekerRange.max;
    // console.log("elapsed", elapsedTime);
    // createMediaTimestamp(videoDuration)
    // console.log("ratio: ", (elapsedTime / videoDuration * 100));
    const oldElapsedTime = Math.floor(elapsedTime / videoDuration * 200);

    const [value, setValue] = React.useState(elapsedTime);
    return (
        <div className="if seeker-control">
            <span className="if seeker-time-elapsed">{createMediaTimestamp(elapsedTime)}</span>
            <input 
                 className="if seeker seeker-control"  type="range" 
                 min={0} 
                 max={videoDuration} 
                 step={1}   
                 value={value} 
                 onChange={(e) => {
                    const newElapsedTime = Number(e.target.value);
                    if (newElapsedTime !== oldElapsedTime) {
                        setValue(newElapsedTime);
                        onProgressChange({'elapsedTimeInSeconds': newElapsedTime});
                    }
                 }}
            />
            <span className="if seeker-time-remaining">{createMediaTimestamp(videoDuration - elapsedTime)}</span>
        </div>
    );
}

export default SeekerControl;