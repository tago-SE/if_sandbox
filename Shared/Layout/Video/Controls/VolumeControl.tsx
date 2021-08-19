import React from 'react';

interface IProps {
    muted: boolean,
    volume: number,
    onVolumeChange?: any,
    label?: string,
    onMute?: any,
    onUnmute?: any,
   
}

const VolumeControl = ({  
    muted,
    volume = 100,
    onVolumeChange,
    onMute = undefined,
    onUnmute = undefined,
    label = "",
}: IProps) => {
    const [active, setActive] = React.useState(true);
    if (volume < 0) volume = 0; 
    else if (volume > 100) volume = 100;

    const [insideInput, setInsideInput] = React.useState(false);
    const [insideButton, setInsideButton] = React.useState(false);

    // console.log("percentage", volume/100);
    return (
        <div 
            className={`if volume-control${active ? " is-active" : ""}`}  
            //     css={css`
            //     background-color: hotpink;
            //     &:hover {
            //         background-color: green;
            //     }
            //   `}
        >
            <button type="button" className={`if volume button${muted ? " is-muted" : ""}`} 
                onClick={() => {
                    if (muted) onUnmute();
                    else onMute();
                }}
                //onMouseEnter={() => setActive(true)}
                //onMouseLeave={() => setActive(false)}
            >
                {label && <span className="if description">{label}</span>}
            </button>
            
            <input 
                className="if volume volume-control" type="range" value={volume} min={0} max={100} step={10}
                //onMouseLeave={() => setActive(false)}
                onChange={onVolumeChange}
                // css={css`
                //     /* color: hotpink; */
                //     border-color: red;
                //     background-color: green;
                // `}
                style={{ backgroundImage: 
                    `linear-gradient(to right, rgb(250, 249, 247) 0%, rgb(250, 249, 247) ${volume}%, rgb(110, 98, 94) 44%, rgb(110, 98, 94) 100%)`}}

            />
        </div>
    );
}

export default VolumeControl;