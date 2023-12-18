
import { useState, useContext, useEffect } from 'react';

import { Box } from '@mui/material';
import { FableButton, FableDialog, PrimaryTextLargeWithMobile, FableAudio, PrimaryTextWithMobile } from '../../Components';
import { ReactMic } from 'react-mic';
import styled from 'styled-components';

import ThemeContext from '../../contexts/themeContext';
import AuthContext from '../../contexts/authContext';
import DialogContext from '../../contexts/dialogContext';
import AudioContext from '../../contexts/audioContext';

import { _postComment } from '../../apis';

const FableShareButton = styled(FableButton)`
    margin: auto;
    width: 173px !important;
`;

export default function PostComment({id, cb, show, setShow}) {
    const dialogCtx = useContext(DialogContext);
    const authCtx = useContext(AuthContext);
    const themeCtx = useContext(ThemeContext);
    const audioCtx = useContext(AudioContext);
    const theme = themeCtx.currentTheme();
    
    const [step, setStep] = useState(1);
    const [record, setRecord] = useState(false);
    const [recordCb, setRecordCb] = useState(null);

    const [tempFile, setTempFile] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [voice, setVoice] = useState(0);

    useEffect(() => {
        if (record === false && recordCb !== null) {
            recordCb();
        }
    }, [record, recordCb])

    const handleClose = () => {
        const cb = () => {
            audioCtx.setPercentagePlayed(0);
            setShow(false);
        }
        setRecord(false);
        setRecordCb(() => cb);
    };

    const renderByStep = () => {
        if (step === 1 || step === 2) {
            const onData = (recordedBlob) => {
                recordedBlob.arrayBuffer()
                .then((res) => {
                    
                })
            }
            
            const onStop = async (recordedBlob) => {
                const url = URL.createObjectURL(recordedBlob.blob);
                setTempFile(url);

                setAudioBlob(recordedBlob.blob);
            }
        
            const startRecord = () => {
                setStep(2);
                setRecord(true);
            }
        
            const stopRecord = () => {
                const cb = () => {
                    setStep(3);
                    setVoice(0);
                }
                setRecord(false);
                setRecordCb(() => cb);
            }

            return <Box className="grid" gridTemplateRows={"1fr auto"} sx={{
                "canvas": {
                    width: "100%",
                    height: 130
                }
            }}>
                <ReactMic 
                    height={130}
                    record={record}
                    backgroundColor={theme.bgColor}
                    strokeColor={theme.primaryColor}
                    onStop={onStop}
                    onData={onData}
                    className="rounded-[10px]"
                    noiseSuppression={true}
                    autoGainControl={true}
                    echoCancellation={true}
                    />
                {
                    step === 1 ?
                    <FableShareButton onClick={() => startRecord()}>
                        Start Recording
                    </FableShareButton>
                    :
                    <FableShareButton onClick={() => stopRecord()}>
                        Finish Recording
                    </FableShareButton>
                }
            </Box>
        }

        if (step === 3) {
            const handleRecordAgain = () => {
                audioCtx.pause();
                setStep(1);
            }

            const handlePost = () => {
                audioCtx.pause();

                setShow(false);
                _postComment(
                    authCtx.getUserId(),
                    id,
                    audioBlob,
                    voice
                )
                .then((res) => {
                    if (res.success === 1) {
                        cb();
                    }
                    else
                        dialogCtx.showError(res.message);
                })
                .catch((e) => {
                    dialogCtx.showError(e.message);
                })
            }

            return <Box className="grid" gridTemplateRows={"auto 1fr auto"}>
                <FableAudio src={tempFile} voice={voice} />
                <Box className="my-6 flex">
                    <PrimaryTextLargeWithMobile className="mr-4 flex flex-col justify-center">
                        Voice Changer:
                    </PrimaryTextLargeWithMobile>
                    <PrimaryTextWithMobile className="text-center ml-4 cursor-pointer">
                        <img className="mb-2 cursor-pointer rounded-[99px]" src="/voice-changer.png" alt="Voice Changer"
                            onClick={() => setVoice(voice !== 1 ? 1 : 0)} style={voice === 1 ? {border: `2px solid ${theme.highlightColor}`} : {}} />
                        Voice 1
                    </PrimaryTextWithMobile>
                    <PrimaryTextWithMobile className="text-center ml-4 cursor-pointer">
                        <img className="mb-2 cursor-pointer rounded-[99px]" src="/voice-changer.png" alt="Voice Changer"
                            onClick={() => setVoice(voice !== 2 ? 2 : 0)} style={voice === 2 ? {border: `2px solid ${theme.highlightColor}`} : {}} />
                        Voice 2
                    </PrimaryTextWithMobile>
                </Box>
                <Box className="xl:flex">
                    <FableShareButton onClick={handleRecordAgain}>
                        Record again
                    </FableShareButton>
                    <FableShareButton onClick={handlePost} className="!mt-2 xl:!mt-auto xl:!ml-4">
                        Post
                    </FableShareButton>
                </Box>
            </Box>
        }
    }
    
    return <FableDialog
        open={show}
        onClose={handleClose}
        >
        <Box className="p-6 min-h-[240px] grid" gridTemplateRows={"1fr"}>
            { renderByStep() }
        </Box>
    </FableDialog>
}