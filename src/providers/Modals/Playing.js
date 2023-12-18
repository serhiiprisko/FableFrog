
import { useState, useContext, useEffect } from 'react';

import { Box, IconButton, Slider, useMediaQuery } from '@mui/material';
import { FableItemBg, SecondaryText, PrimaryText, PlayCircleIcon, PauseCircleIcon, PlaySpeedButton } from '../../Components';
import styled from "styled-components";

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import CloseIcon from '@mui/icons-material/Close';

import ThemeContext from '../../contexts/themeContext';
import DialogContext from '../../contexts/dialogContext';
import AuthContext from '../../contexts/authContext';
import AudioContext from '../../contexts/audioContext';
import { _trackUser } from '../../apis';

const TrackButton = styled(PrimaryText)`
    cursor: pointer;
    color: #6D61FD;
`;

function ControlButton({size, icon, align, onClick}) {
    return <Box className={`flex fit-content ${align === "top" ? "mb-auto pt-2" : "my-auto"}`}>
        <IconButton sx={{
            "svg": {
                fontSize: size,
                color: "#706D8B"
            }
        }}
        onClick={onClick}
        >
            {icon}
        </IconButton>
    </Box>
}

const speeds = [
    {title: "Normal", speed: 1},
    {title: "X1.5", speed: 1.5},
    {title: "X2", speed: 2},
    {title: "X2.5", speed: 2.5},
    {title: "X3", speed: 3},
]

export default function Playing({show, setShow, details}) {
    const isDesktop = useMediaQuery('(min-width:1280px)');
    const authCtx = useContext(AuthContext);
    const themeCtx = useContext(ThemeContext);
    const dialogCtx = useContext(DialogContext);
    const audioCtx = useContext(AudioContext);
    const theme = themeCtx.currentTheme();

    const [speed, setSpeed] = useState(0);

    const stringToInt = (str) => {
        const val = parseInt(str);
        if (isNaN(val)) return 0;
        return val;
    }

    const stringToTime = (str) => {
        const sec_num = stringToInt(str);
        let hours   = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return minutes+':'+seconds;
    }

    useEffect(() => {
        audioCtx.stop();
        setSpeed(0);
        audioCtx.load(details.audioFile, details.voice);
    }, [details])

    useEffect(() => {
        if (audioCtx.percentagePlayed > 99.99999999) {
            setTimeout(() => {
                pause();
            }, [1000]);
        }
    }, [audioCtx.percentagePlayed])

    useEffect(() => {
        if (dialogCtx.playingFable !== null) {
            if (dialogCtx.playingStatus)
                audioCtx.play();
            else
                audioCtx.pause();
        }
    }, [dialogCtx.playingStatus])

    useEffect(() => {
        audioCtx.setSpeed(speeds[speed].speed);
    }, [speed])

    const handleChangeProgress = (e) => {
        audioCtx.seek(e.target.value);
    }

    const play = () => {
        dialogCtx.setPlayingStatus(true)
    }

    const pause = () => {
        dialogCtx.setPlayingStatus(false)
    }

    const handleSpeed = () => {
        setSpeed((speed + 1) % speeds.length);
    }

    const handleClose = () => {
        dialogCtx.setPlayingFable(null);
        audioCtx.setPercentagePlayed(0);
        audioCtx.stop();
        setShow(false);
    };

    const handleTrack = () => {
        _trackUser(details.authorId, authCtx.getUserId())
        .then((res) => {
            if (res.success === 1)
                details.following = res.isSubscribed;
            else
                dialogCtx.showError(res.message);
        })
        .catch((e) => {
            dialogCtx.showError(e.message);
        })
    }

    const renderSlider = () => {
        return <Slider
            size="small"
            max={stringToInt(audioCtx.duration)}
            value={stringToInt(audioCtx.progress)}
            onChange={handleChangeProgress}
            sx={{
                "& .MuiSlider-rail": {
                    background: theme.secondaryColor,
                    opacity: 1
                },
                "& .MuiSlider-track": {
                    height: 5,
                    background: theme.highlightColor,
                    opacity: 1
                },
                "& .MuiSlider-thumb": {
                    color: theme.highlightColor,
                }
            }}
        />
    }

    const renderDesktopPlaying = () => {
        return <FableItemBg className="rounded-t-[10px] fixed bottom-0 left-[14%] w-[72%] h-[128px] flex z-[5]">
            <Box className="min-w-[128px] rounded-tl-[10px] bg-center bg-cover relative" style={{backgroundImage: `url(${details.photo})`}} />
            <Box className="p-4 w-full flex">
                <Box>
                    <SecondaryText className="pb-2">{details.author}</SecondaryText>
                    {
                        authCtx.getUserId() === details.authorId ? "" :
                        authCtx.isLogin() === false ? "" :
                        <TrackButton onClick={handleTrack}>
                            {details.following ? "Untrack" : "Track"}
                        </TrackButton>
                    }
                </Box>
                <Box className="grid w-full" gridTemplateColumns={"auto 1fr"}>
                    <Box />
                    <Box className="flex pb-4">
                        <PrimaryText className="mr-auto">{details.title}</PrimaryText>
                        <PlaySpeedButton onClick={handleSpeed}>{speeds[speed].title}</PlaySpeedButton>
                    </Box>
                    <SecondaryText className="mt-auto mb-[5px] p-1 !text-[#6D61FD]">{stringToTime(audioCtx.progress)}</SecondaryText>
                    <Box className="mt-auto flex">
                        <Box className="w-full px-2">
                            { renderSlider() }
                        </Box>
                        <SecondaryText className="p-1">{stringToTime(audioCtx.duration)}</SecondaryText>
                    </Box>
                </Box>
            </Box>
            {/*<ControlButton size={24} icon={<SkipPreviousIcon />} />*/}
            {
                dialogCtx.playingStatus === false ?
                <ControlButton size={64} icon={<PlayCircleIcon size={64} variant="secondary" />} onClick={play} />
                :
                <ControlButton size={64} icon={<PauseCircleIcon size={64} variant="secondary" />} onClick={pause} />
            }
            {/*<ControlButton size={24} icon={<SkipNextIcon />} />*/}
            <Box className="pl-2" />
            <ControlButton size={24} icon={<CloseIcon />} align="top" onClick={handleClose} />
            <Box className="pl-2" />
        </FableItemBg>
    }

    const renderMobilePlaying = () => {
        return <FableItemBg className="rounded-t-[10px] fixed bottom-0 left-0 w-full h-[288px] z-[5]">
            <Box className="h-[72px] w-full grid" gridTemplateColumns={"auto 1fr auto auto"}>
                <Box className="min-w-[72px] rounded-tl-[10px] bg-center bg-cover relative" style={{backgroundImage: `url(${details.photo})`}} />
                <Box className="px-4 py-2">
                    <SecondaryText className="pb-2">{details.author}</SecondaryText>
                    {
                        authCtx.getUserId() === details.authorId ? "" :
                        authCtx.isLogin() === false ? "" :
                        <TrackButton onClick={handleTrack}>
                            {details.following ? "Untrack" : "Track"}
                        </TrackButton>
                    }
                </Box>
                {
                    dialogCtx.playingStatus === false ?
                    <ControlButton size={48} icon={<PlayCircleIcon size={48} variant="secondary" />} onClick={play} />
                    :
                    <ControlButton size={48} icon={<PauseCircleIcon size={48} variant="secondary" />} onClick={pause} />
                }
                <ControlButton size={16} icon={<CloseIcon />} align="top" onClick={handleClose} />
            </Box>
            <Box className="flex px-6 pt-4">
                <PrimaryText className="mr-auto">{details.title}</PrimaryText>
                <PlaySpeedButton onClick={handleSpeed}>{speeds[speed].title}</PlaySpeedButton>
            </Box>
            <Box className="w-full px-6 h-[32px]">
                { renderSlider() }
            </Box>
            <Box className="flex px-6">
                <SecondaryText className="!text-[#6D61FD]">{stringToTime(audioCtx.progress)}</SecondaryText>
                <SecondaryText className="ml-auto">{stringToTime(audioCtx.duration)}</SecondaryText>
            </Box>
        </FableItemBg>
    }

    return <Box
        className={show ? "block" : "hidden"}
        >
        {isDesktop ? renderDesktopPlaying() : renderMobilePlaying()}
    </Box>
}