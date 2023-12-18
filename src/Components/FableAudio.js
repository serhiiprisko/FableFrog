
import { useContext, useEffect } from 'react';
import { Box, Slider } from "@mui/material";

import { SecondaryText } from './FableText';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import AudioContext from '../contexts/audioContext';

export function FableAudio({src, voice}) {
    const audioCtx = useContext(AudioContext);

    const stringToInt = (str) => {
        const val = parseInt(str);
        if (isNaN(val)) return 0;
        return val;
    }

    useEffect(() => {
        audioCtx.load(src, 100);
    }, [src])

    useEffect(() => {
        audioCtx.setVoice(voice);
    }, [voice])

    useEffect(() => {
        if (audioCtx.percentagePlayed > 99.99999999) {
            setTimeout(() => {
                audioCtx.pause();
            }, [1000]);
        }
    }, [audioCtx.percentagePlayed])

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

    const handleChangeProgress = (e) => {
        audioCtx.seek(e.target.value);
    }

    return <Box className="grid w-full h-[54px] bg-[#f1f3f4] rounded-[99px] px-[22px] gap-[8px] xl:gap-[16px]" gridTemplateColumns={"auto auto 1fr"}>
        {
            audioCtx.playing ? 
            <PauseIcon className="my-auto cursor-pointer" sx={{fontSize: 20, color: "#0b0b0b"}} onClick={() => audioCtx.pause()} />
            :
            <PlayArrowIcon className="my-auto cursor-pointer" sx={{fontSize: 20, color: "#0b0b0b"}} onClick={() => audioCtx.play()} />
        }
        <SecondaryText className="my-auto !text-[#0b0b0b]">{stringToTime(audioCtx.progress)} / {stringToTime(audioCtx.duration)}</SecondaryText>
        <Box className="my-auto">
            <Slider
                size="small"
                max={stringToInt(audioCtx.duration)}
                value={stringToInt(audioCtx.progress)}
                onChange={handleChangeProgress}
                sx={{
                    "& .MuiSlider-rail": {
                        background: "#595959",
                        opacity: 1
                    },
                    "& .MuiSlider-track": {
                        height: 4,
                        background: "#0b0b0b",
                        opacity: 1
                    },
                    "& .MuiSlider-thumb": {
                        display: "none"
                    }
                }}
            />
        </Box>
    </Box>
}