import { useState, useContext, useEffect } from "react";

import { Box } from "@mui/material";
import { FableButton, FableDialog } from "../../Components";
import { ReactMic } from "react-mic";
import styled from "styled-components";

import ThemeContext from "../../contexts/themeContext";
import AuthContext from "../../contexts/authContext";
import DialogContext from "../../contexts/dialogContext";

import { _postVoice } from "../../apis";

const FableShareButton = styled(FableButton)`
  margin: auto;
  width: 173px !important;
`;

export default function AddVoiceSample({ show, setShow }) {
  const dialogCtx = useContext(DialogContext);
  const authCtx = useContext(AuthContext);
  const themeCtx = useContext(ThemeContext);
  const theme = themeCtx.currentTheme();

  const [step, setStep] = useState(1);
  const [record, setRecord] = useState(false);
  const [recordCb, setRecordCb] = useState(null);

  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    if (record === false && recordCb !== null && audioBlob !== null) {
      recordCb(audioBlob);
    }
  }, [record, recordCb, audioBlob]);

  const handleClose = () => {
    if (step === 1) setShow(false);
    else {
      const cb = () => {
        setShow(false);
      };
      setRecord(false);
      setRecordCb(() => cb);
    }
  };

  const renderByStep = () => {
    if (step === 1 || step === 2) {
      const onData = (recordedBlob) => {
        recordedBlob.arrayBuffer().then((res) => {});
      };

      const onStop = async (recordedBlob) => {
        setAudioBlob(recordedBlob.blob);
      };

      const startRecord = () => {
        setStep(2);
        setRecord(true);
      };

      const stopRecord = () => {
        const cb = (audioBlob) => {
          _postVoice(authCtx.getUserId(), audioBlob)
            .then((res) => {
              if (res.success === 1) authCtx.goToProfile();
              else dialogCtx.showError(res.message);
            })
            .catch((e) => {
              dialogCtx.showError(e.message);
            });
          setShow(false);
        };
        setRecord(false);
        setRecordCb(() => cb);
      };

      return (
        <Box
          className="grid"
          gridTemplateRows={"1fr auto"}
          sx={{
            canvas: {
              width: "100%",
              height: 130,
            },
          }}
        >
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
          {step === 1 ? (
            <FableShareButton onClick={() => startRecord()}>
              Start Recording
            </FableShareButton>
          ) : (
            <FableShareButton onClick={() => stopRecord()}>
              Finish Recording
            </FableShareButton>
          )}
        </Box>
      );
    }
  };

  return (
    <FableDialog open={show} onClose={handleClose}>
      <Box className="p-6 min-h-[240px] grid" gridTemplateRows={"1fr"}>
        {renderByStep()}
      </Box>
    </FableDialog>
  );
}
