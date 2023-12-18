import { useState, useContext, useEffect, useRef } from "react";

import {
  Box,
  ToggleButton,
  InputAdornment,
  CircularProgress,
  Slider,
} from "@mui/material";
import {
  FableButton,
  FableDialog,
  FableContactInput,
  FableShareInput,
  PrimaryTextSmall,
  ShareTopicButton,
  ShareTopicText,
  FableAudio,
  PrimaryTextLargeWithMobile,
  PrimaryTextWithMobile,
} from "../../Components";
import { ReactMic } from "react-mic";
import styled from "styled-components";

import { _getTopics, _getSubTopics, _postFable } from "../../apis";

import SearchIcon from "@mui/icons-material/Search";

import ThemeContext from "../../contexts/themeContext";
import DialogContext from "../../contexts/dialogContext";
import AuthContext from "../../contexts/authContext";
import AudioContext from "../../contexts/audioContext";

import axios from "axios";

const FableShareTab = styled(PrimaryTextSmall)`
  padding: 8px 16px;

  width: fit-content;
  background: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.highlightColor};
  border-width: ${(props) => (props.active ? "1px" : "0px")};
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.06);
  border-radius: 28px;

  @media (max-width: 1280px) {
    padding: 8px 8px;
    font-size: 11px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const FableShareButton = styled(FableButton)`
  margin-left: auto;
  width: 173px !important;
`;

function FableShareToggle(props) {
  const themeCtx = useContext(ThemeContext);
  const theme = themeCtx.currentTheme();

  return (
    <ToggleButton
      sx={{
        textTransform: "none",
        padding: 0,
        borderRadius: 60,
        margin: "0 4px 4px 0",
        "&.Mui-selected": {
          backgroundColor: `${theme.secondaryColor}80`,
        },
        "&:hover": {
          backgroundColor: `${theme.secondaryColor}80 !important`,
        },
      }}
      {...props}
    >
      <ShareTopicText>{props.value.title}</ShareTopicText>
    </ToggleButton>
  );
}

export default function ShareYourFable({ t, show, setShow }) {
  const fileRef = useRef(null);

  const themeCtx = useContext(ThemeContext);
  const dialogCtx = useContext(DialogContext);
  const authCtx = useContext(AuthContext);
  const audioCtx = useContext(AudioContext);
  const theme = themeCtx.currentTheme();

  const [uploading, setUploading] = useState(false);
  const [topics, setTopics] = useState(null);
  const [subTopics, setSubTopics] = useState(null);

  const [step, setStep] = useState(0);
  const [record, setRecord] = useState(false);
  const [recordCb, setRecordCb] = useState(null);
  const [isUrl, setIsUrl] = useState(false);

  const [title, setTitle] = useState(t);
  const [tempFile, setTempFile] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [voice, setVoice] = useState(100);
  const [topic, setTopic] = useState(null);
  const [subTopic, setSubTopic] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    _getTopics().then((res) => {
      setTopics(res.topics);
    });
  }, []);

  useEffect(() => {
    if (query === "") setResult([]);
    else {
      /*fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=6&nojsoncallback=1&format=json&extras=url_m&api_key=9950947ed7d7f851721516b5115160be&text=${query}`)
            .then((res) => res.json())
            .then((res) => {
                setResult(res.photos.photo);
            })*/
      fetch(
        `https://api.unsplash.com/search/photos/?per_page=6&client_id=Z6i7uRBdIwjSl3nKq_NC2ILj7uDkU-10tLKxR7HJjPs&query=${query}`
      )
        .then((res) => res.json())
        .then((res) => {
          setResult(res.results);
        });
    }
  }, [query]);

  useEffect(() => {
    if (image === null) {
      axios
        .get("/dummy_cover.png", {
          responseType: "blob",
        })
        .then((res) => {
          const imageFile = new File([res.data], "cover.png", {
            type: "image/png",
          });
          setImage(imageFile);
        });
      return;
    }

    let fr = new FileReader();
    fr.onload = function () {
      setImageUrl(fr.result);
    };
    fr.readAsDataURL(image);
  }, [image]);

  useEffect(() => {
    setSubTopics(null);
    if (topic !== null) {
      _getSubTopics(topic.id).then((res) => {
        setSubTopics(res.topics);
      });
    }
  }, [topic]);

  useEffect(() => {
    if (record === false && recordCb !== null) {
      recordCb();
    }
  }, [record, recordCb]);

  const handleClose = () => {
    const cb = () => {
      audioCtx.pause();
      audioCtx.setPercentagePlayed(0);
      setShow(false);
    };
    setRecord(false);
    setRecordCb(() => cb);
  };

  const renderByStep = () => {
    if (step === 0) {
      const handleNext = () => {
        if (title === "") dialogCtx.showWarning("Input Fable Title");
        else setStep(1);
      };

      return (
        <Box className="grid" gridTemplateRows={"auto 1fr auto"}>
          <PrimaryTextLargeWithMobile className="mb-4">
            Give your fable a title:
          </PrimaryTextLargeWithMobile>
          <FableShareInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
            placeholder="Write a few words about your fable..."
          />
          <FableShareButton onClick={handleNext}>Continue</FableShareButton>
        </Box>
      );
    }

    if (step === 1 || step === 2) {
      const onData = (recordedBlob) => {
        recordedBlob.arrayBuffer().then((res) => {});
      };

      const onStop = async (recordedBlob) => {
        const url = URL.createObjectURL(recordedBlob.blob);
        setTempFile(url);

        setAudioBlob(recordedBlob.blob);
      };

      const startRecord = () => {
        setStep(2);
        setRecord(true);
      };

      const stopRecord = () => {
        const cb = () => {
          setStep(3);
          setVoice(100);
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
              height: 140,
            },
          }}
        >
          <ReactMic
            height={140}
            record={record}
            backgroundColor={theme.bgColor}
            strokeColor={theme.primaryColor}
            onStop={onStop}
            onData={onData}
            mimeType="audio/wav"
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

    if (step === 3) {
      const handleStep = (step) => {
        audioCtx.pause();
        setStep(step);
      };

      return (
        <Box className="grid" gridTemplateRows={"auto 1fr auto"}>
          <FableAudio src={tempFile} voice={voice} />
          <Box className="my-6">
            <PrimaryTextLargeWithMobile className="mb-2 flex flex-col justify-center">
              Voice Changer:
            </PrimaryTextLargeWithMobile>
            <Slider
              size="small"
              max={200}
              min={0}
              value={200 - voice}
              direction="right"
              onChange={(e) => {
                setVoice(200 - e.target.value);
              }}
              sx={{
                "& .MuiSlider-rail": {
                  height: 7,
                  background: theme.bgColor,
                  opacity: 1,
                },
                "& .MuiSlider-track": {
                  height: 7,
                  background: theme.primaryColor,
                  opacity: 1,
                },
                "& .MuiSlider-thumb": {
                  height: 20,
                  width: 20,
                  color: theme.primaryColor,
                },
              }}
            />
          </Box>
          <Box className="xl:flex">
            <FableShareButton
              className="!mr-auto xl:!mr-0"
              onClick={() => handleStep(1)}
            >
              Record again
            </FableShareButton>
            <FableShareButton
              onClick={() => handleStep(4)}
              className="!mt-2 !mr-auto xl:!mt-auto xl:!ml-4 xl:!mr-0"
            >
              Continue
            </FableShareButton>
          </Box>
        </Box>
      );
    }

    if (step === 4) {
      const handleTopicChange = (value) => {
        setSubTopic([]);
        setTopic(value);
      };

      const handleSubTopicChange = (e, value) => {
        let _subTopic = [...subTopic];
        if (subTopic.includes(value))
          _subTopic = _subTopic.filter((ele) => ele !== value);
        else _subTopic.push(value);
        setSubTopic(_subTopic);
      };

      const handleNext = () => {
        if (subTopic.length === 0) dialogCtx.showWarning("Select Fable Topics");
        else setStep(5);
      };

      return (
        <Box className="grid" gridTemplateRows={"auto 1fr auto"}>
          <PrimaryTextLargeWithMobile className="mb-4">
            Topics:
          </PrimaryTextLargeWithMobile>
          <Box className="mb-4">
            {topic === null ? (
              <>
                {topics?.map((item, i) => {
                  return (
                    <FableShareToggle
                      key={i}
                      value={item}
                      selected={topic === item}
                      onChange={() => handleTopicChange(item)}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <FableShareToggle
                  value={topic}
                  selected={true}
                  onChange={() => handleTopicChange(null)}
                />
                <PrimaryTextLargeWithMobile className="my-4">
                  Sub Topics:
                </PrimaryTextLargeWithMobile>
                {subTopics?.map((item, i) => {
                  return (
                    <FableShareToggle
                      key={i}
                      value={item}
                      selected={subTopic.includes(item)}
                      onChange={(e, value) => handleSubTopicChange(e, value)}
                    />
                  );
                })}
              </>
            )}
          </Box>
          <FableShareButton onClick={handleNext}>Continue</FableShareButton>
        </Box>
      );
    }

    if (step === 5) {
      const handleUpload = () => {
        setIsUrl(false);
        fileRef.current.value = null;
        fileRef.current.click();
      };

      const handleSearch = () => {
        setIsUrl(true);
        setUrl("");
        setQuery("");
        setImage(null);
      };

      const handleFileChange = (e) => {
        if (e.target.files.length === 0) setImage(null);
        else setImage(e.target.files[0]);
      };

      const handleSubmit = () => {
        if (title === "") {
          dialogCtx.showWarning("Input Fable Title");
          setStep(0);
          return;
        }

        if (audioBlob === null) {
          dialogCtx.showWarning("Record your fable");
          setStep(1);
          return;
        }

        if (subTopic.length === 0) {
          dialogCtx.showWarning("Select Fable Topics");
          setStep(4);
          return;
        }

        if (url === "" && image === null)
          dialogCtx.showWarning("Select Fable Cover Photo");
        else {
          setUploading(true);
          _postFable(
            authCtx.getUserId(),
            title,
            voice,
            audioBlob,
            subTopic,
            image,
            url,
            isUrl
          )
            .then((res) => {
              setShow(false);
              if (res.success === 1) {
                dialogCtx.showToast(res.message);
                authCtx.goToProfile();
              } else dialogCtx.showError(res.message);
            })
            .catch((e) => {
              dialogCtx.showError(e.message);
            });
        }
      };

      return (
        <Box className="grid" gridTemplateRows={"auto 1fr auto"}>
          {isUrl === true && url === "" ? (
            ""
          ) : (
            <Box
              className="h-[160px] w-full rounded-[10px] mb-4 bg-center bg-cover"
              style={{ backgroundImage: `url(${isUrl ? url : imageUrl})` }}
            />
          )}
          <PrimaryTextLargeWithMobile className="mb-4">
            Cover Photo:
          </PrimaryTextLargeWithMobile>
          <Box>
            <Box className="flex mb-4 justify-center">
              <ShareTopicButton className="mr-4" onClick={handleUpload}>
                Upload Picture
              </ShareTopicButton>
              <ShareTopicButton onClick={handleSearch}>
                Search Picture
              </ShareTopicButton>
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </Box>
            {isUrl === false ? (
              ""
            ) : (
              <Box>
                <FableContactInput
                  size="small"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  sx={{
                    mb: 2,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Box className="grid grid-cols-3 gap-[10px] mb-2">
                  {result.map((item, i) => {
                    return (
                      <Box
                        key={i}
                        className="h-[160px] rounded-[10px] bg-center bg-cover cursor-pointer"
                        style={{ backgroundImage: `url(${item.urls.regular})` }}
                        onClick={() => setUrl(item.urls.regular)}
                      />
                    );
                  })}
                </Box>
              </Box>
            )}
          </Box>
          {uploading ? (
            <Box className="flex ml-auto">
              <CircularProgress />
              <PrimaryTextSmall className="ml-4 flex flex-col justify-center">
                Uploading
              </PrimaryTextSmall>
            </Box>
          ) : (
            <FableShareButton onClick={handleSubmit}>
              Post Fable
            </FableShareButton>
          )}
        </Box>
      );
    }
  };

  const handleClickTab = (tab) => {
    if (step === 2) {
      dialogCtx.showWarning("Finish your recording");
      return;
    }

    audioCtx.pause();
    setStep(tab);
  };

  return (
    <FableDialog open={show} onClose={handleClose} maxWidth={600}>
      <Box className="p-6 min-h-[300px] grid" gridTemplateRows={"auto 1fr"}>
        <Box className="flex mb-4">
          <FableShareTab
            active={step === 0}
            className="mr-[10px] cursor-pointer"
            onClick={() => handleClickTab(0)}
          >
            Title
          </FableShareTab>
          <FableShareTab
            active={step === 1 || step === 2 || step === 3}
            className="mr-[10px] cursor-pointer"
            onClick={() => handleClickTab(1)}
          >
            Recording
          </FableShareTab>
          <FableShareTab
            active={step === 4}
            className="mr-[10px] cursor-pointer"
            onClick={() => handleClickTab(4)}
          >
            Topics
          </FableShareTab>
          <FableShareTab
            active={step === 5}
            className="cursor-pointer"
            onClick={() => handleClickTab(5)}
          >
            Cover Photo
          </FableShareTab>
        </Box>
        {renderByStep()}
      </Box>
    </FableDialog>
  );
}
