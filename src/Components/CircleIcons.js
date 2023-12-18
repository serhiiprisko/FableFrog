
export function PlayCircleIcon({size, variant="primary"}) {
    return <img src={`/play-${variant}.svg`} alt="play" style={{width: size, height: size}} />
}

export function PauseCircleIcon({size, variant="primary"}) {
    return <img src={`/pause-${variant}.svg`} alt="pause" style={{width: size, height: size}} />
}