
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, IconButton, useMediaQuery } from "@mui/material";
import { PrimaryTextLarge, FableTopicText, FableTopicTextLarge, PrimaryText, SecondaryText, FableMenu } from "../../Components";
import ContentHeader from "../ContentHeader";
import styled from "styled-components";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { _getTopics, _getSubTopics } from "../../apis";

const FableTopicBg = styled(Box)`
    cursor: pointer;
    background: ${props => props.theme.inputBgColor};
`;

export default function Content() {
    const isDesktop = useMediaQuery('(min-width:1280px)');
    const navigate = useNavigate();

    const [topic, setTopic] = useState(null);
    const [details, setDetails] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (topic === null) {
            setDetails(null);
            _getTopics()
            .then((res) => {
                setDetails(res);
            })
        }
        else {
            setDetails(null);
            _getSubTopics(topic.id)
            .then((res) => {
                setDetails(res);
            })
        }
    }, [topic])

    const renderSubHeader = () => {
        if (topic === null)
            return <Box className="h-[24px]" />
        else 
            return <Box>
                <IconButton onClick={() => setTopic(null)} sx={{padding: 0, height: 24}}>
                    <ArrowBackIcon />
                </IconButton>
                <span className="pr-3" />
                {topic.title}
            </Box>
    }

    const renderHeader = () => {
        if (isDesktop) {
            return <PrimaryTextLarge className="pt-14 pb-4">
            {
                topic === null ? "Topics" : renderSubHeader()
            }
            </PrimaryTextLarge>
        }
        else {
            return <PrimaryText className="pt-14 pb-4">
                <Box className="pb-4 text-center">
                    Topics
                    <span className="pr-3" />
                    <ZoomInIcon />
                    <SecondaryText className="inline absolute right-[32px]">
                        <ErrorOutlineIcon onClick={(e) => setAnchorEl(e.currentTarget)}/>
                    </SecondaryText>
                </Box>
                {renderSubHeader()}
                <FableMenu
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    sx={{
                        "& .MuiPaper-root": {
                            width: "100%",
                            left: "16px",
                            marginTop: "16px"
                        },
                    }}
                >
                    <PrimaryText className="break-word !font-[400] !text-black px-[36px] py-[56px]">
                        <b>About Topics</b>
                        <br/><br/>
                        The various topics keywords will help you find fables of similar nature.
                        <br/><br/>
                        Tracking a topic will send fables of that topic to your home page for listening.
                        <br/><br/>
                        This will make it easier for you to <b>find fables</b> instead of having to go to the specific topic page in order to find them.
                    </PrimaryText>
                </FableMenu>
            </PrimaryText>
        }
    }

    return <Box className="w-full xl:px-10">
        {isDesktop && <ContentHeader />}
        { renderHeader() }
        <Box className="grid gap-4" gridTemplateColumns={isDesktop ? `repeat(auto-fill, minmax(340px, 1fr))` : ``}>
        {
            topic === null ?
            details?.topics.map((item, i) => {
                return <FableTopicBg key={i} className="rounded-[10px]" onClick={() => setTopic(item)}>
                    <Box className="rounded-[10px] bg-center bg-cover relative" style={{backgroundImage: `url(${item.img})`}}>
                        <Box className="rounded-[10px] p-4 pt-20 bg-[#00000070] flex">
                            <FableTopicTextLarge>
                                {item.title}
                            </FableTopicTextLarge>
                            <FableTopicText className="ml-auto">
                                {`${item.participates} Participates`}
                            </FableTopicText>
                        </Box>
                    </Box>
                </FableTopicBg>
            })
            :
            details?.topics.map((item, i) => {
                return <FableTopicBg key={i} className="rounded-[10px]" onClick={() => navigate(`/topic/${item.id}`)}>
                    <Box className="rounded-[10px] bg-center bg-cover relative" style={{backgroundImage: `url(${item.img})`}}>
                        <Box className="rounded-[10px] p-4 pt-20 bg-[#00000070] flex">
                            <FableTopicTextLarge>
                                {item.title}
                            </FableTopicTextLarge>
                            <FableTopicText className="ml-auto">
                                {`${item.participates} Participates`}
                            </FableTopicText>
                        </Box>
                    </Box>
                </FableTopicBg>
            })
        }
        </Box>
    </Box>;
}