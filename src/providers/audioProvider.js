
import { useState, useEffect } from 'react';
import AudioContext from '../contexts/audioContext';

import { PitchShifter } from 'soundtouchjs';

import axios from 'axios';

export default function AudioProvider({ audioCtx, gainNode, ...props }) {
	const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [percentagePlayed, setPercentagePlayed] = useState(0);
    const [shifter, setShifter] = useState(null);
    const [playing, setPlaying] = useState(false);

    const onPlay = (data) => {
        setPercentagePlayed(data.percentagePlayed);
        setProgress(data.timePlayed);
    };

    const newShifter = (buffer, voice) => {
        if (shifter) {
            shifter.disconnect();
            shifter.off();
        }

        const myShifter = new PitchShifter(audioCtx, buffer, 16384);
        myShifter.tempo = 1;
        if (voice === undefined || voice === null)
            voice = 100;
        if (voice >= 100)
            myShifter.pitch = voice / 100;
        else
            myShifter.pitch = voice / 200 + 0.5;
        myShifter.on('play', onPlay);
        setDuration(myShifter.duration);
        setShifter(myShifter);
    };

    useEffect(() => {
        if (shifter !== null)
            play();
    }, [shifter]);

    const load = (file, voice) => {
        setDuration(0);
        setProgress(0);
        sessionStorage.setItem("FABLEFROG_CURFILE", file);

        audioCtx.resume();
        axios.get(file, {
            responseType: 'blob',
        })
        .then((res) => res.data.arrayBuffer())
        .then((res) => {
            if (file === sessionStorage.getItem("FABLEFROG_CURFILE")) {
                audioCtx.decodeAudioData(res, (audioBuffer) => {
                    newShifter(audioBuffer, voice);
                });
            }
        })
    };

    const play = () => {
        if (shifter) {
            shifter.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            audioCtx.resume();

            if (percentagePlayed > 99.99999999)
                seek(0);
        }
        setPlaying(true);
    };

    const pause = () => {
        if (shifter)
            shifter.disconnect();
        setPlaying(false);
    };

    const stop = () => {
        if (shifter) {
            shifter.disconnect();
            shifter.off();
        }
        sessionStorage.setItem("FABLEFROG_CURFILE", "");
        setShifter(null);
    }

    const setSpeed = (value) => {
        if (shifter)
          shifter.tempo = value;
    };

    const setVoice = (value) => {
        if (shifter) {
            if (value === undefined || value === null)
                value = 100;
            if (value >= 100)
                shifter.pitch = value / 100;
            else
                shifter.pitch = value / 200 + 0.5;
        }
    }

    const seek = (value) => {
        if (shifter)
            shifter.percentagePlayed = value / duration;
    };

	let context = {
        playing,
		duration,
        progress,
        percentagePlayed,
        setPercentagePlayed,
        load,
        play,
        pause,
        stop,
        seek,
        setSpeed,
        setVoice,
	};

	return (
		<AudioContext.Provider value={context}>
			{props.children}
		</AudioContext.Provider>
	);
};