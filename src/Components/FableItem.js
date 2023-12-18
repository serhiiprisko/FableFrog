
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { PrimaryTextSmall, SecondaryText, FableItemText, FableItemTextLarge, FableItemTextSmall, FableCommentText, FableCommentLarge, FableComment } from "./FableText";
import { PlayCircleIcon, PauseCircleIcon } from "./CircleIcons";
import ImageViewer from 'react-simple-image-viewer';
import styled from "styled-components";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import MicIcon from '@mui/icons-material/Mic';
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
// import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import DialogContext from "../contexts/dialogContext";
import MenuContext from "../contexts/menuContext";
import AuthContext from "../contexts/authContext";
import ThemeContext from "../contexts/themeContext";
import { _getComments, _getSingleStory, _like } from "../apis";

import CloseIcon from '@mui/icons-material/Close';

const FableItemTopic = styled(PrimaryTextSmall)`
    padding: 2px 8px;

    color: ${props => props.theme.topicColor};
    background: ${props => props.theme.whiteColor};
    border-radius: 5px;

    @media (max-width: 1280px) {
        font-size: 12px;
        line-height: 14px;
    }
`;

export const FableItemBg = styled(Box)`
    background: ${props => props.theme.inputBgColor};
`;

export function FableItem(props) {
    const isDesktop = useMediaQuery('(min-width:1280px)');
    const dialogCtx = useContext(DialogContext);
    const menuCtx = useContext(MenuContext);
    const authCtx = useContext(AuthContext);
    const themeCtx = useContext(ThemeContext);
    const theme = themeCtx.currentTheme();

    const navigate = useNavigate();

    const [item, setItem] = useState(props.item);
    const [comments, setComments] = useState(false);
    const [details, setDetails] = useState(null);
    const [viewerOpen, setViewerOpen] = useState(false);

    const size = isDesktop ? 72 : 58;
    const playing = (dialogCtx.playingStatus === true && dialogCtx.playingFable?.id === item.id)

    const refreshItem = () => {
        _getSingleStory(authCtx.getUserId(), item.id)
        .then((res) => {
            setItem(res.story);
        })
    }

    const handleLike = () => {
        _like(authCtx.getUserId(), item.id)
        .then((res) => {
            refreshItem();
        })
    }

    useEffect(() => {
        if (comments)
            refreshComments();
    }, [comments]);

    const refreshComments = () => {
        setDetails(null);
        _getComments(authCtx.getUserId(), item.id)
        .then((res) => {
            setDetails(res.comments);
        })
    }

    const renderComment = () => {
        if (comments === false) return "";
        if (details === null) return "";

        const handleClick = () => {
            if (authCtx.isLogin())
                dialogCtx.showPostComment(item.id, refreshComments);
            else
                dialogCtx.showLogin();
        }

        return <Box className="px-6 py-4">
            {
                details.length === 0 ?
                <>
                    <FableCommentLarge className="pb-2">
                        Comments not found.
                    </FableCommentLarge>
                    <FableComment className="pb-2">
                        Be the first to leave an audio comment.
                    </FableComment>
                </>
                :
                details.map((item, i) => {
                    const playing = (dialogCtx.playingStatus === true && dialogCtx.playingFable?.id === item.id)
                    return <Box key={i} className="pb-2 grid" gridTemplateColumns={"70px 1fr auto"}>
                        <Box className="rounded-[8px] bg-center bg-contain bg-no-repeat relative" style={{backgroundImage: `url(${item.photo})`}} />
                        <Box className="px-4 py-2">
                            <SecondaryText className="pb-2 cursor-pointer" onClick={() => navigate(`/profile/${item.authorId}`)}>
                                {item.author}
                            </SecondaryText>
                            <SecondaryText>{item.time}</SecondaryText>
                        </Box>
                        <Box className="flex my-auto">
                            <IconButton sx={{
                                "svg": {
                                    fontSize: 50,
                                    color: "#706D8B"
                                }
                            }}
                            onClick={() => dialogCtx.setPlaying(item, !playing)}
                            >
                                {
                                    playing ?
                                    <PauseCircleIcon variant="secondary" size={50} />
                                    :
                                    <PlayCircleIcon variant="secondary" size={50} />
                                }
                            </IconButton>
                        </Box>
                    </Box>
                })
            }
            <Box className="flex pt-4" sx={{
                "svg": {
                    color: theme.highlightColor
                }
            }}>
                <FableCommentText className="w-full mr-auto flex flex-col justify-center">
                    Press the mic icon to record a reply...
                </FableCommentText>
                <MicIcon className="cursor-pointer" onClick={handleClick} />
            </Box>
        </Box>
    }

    const renderContent = () => {
        if (isDesktop) {
            return <>
                <Box className="pt-32" />
                <FableItemText className="pb-4 cursor-pointer" onClick={() => navigate(`/profile/${item.authorId}`)}>
                    {item.author}
                </FableItemText>
                <FableItemTextLarge className="pb-4 cursor-pointer" onClick={() => navigate(`/fable/${item.id}`)}>
                    {item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}
                </FableItemTextLarge>
                <Box className="flex">
                {
                    item.topics.map((topic, i) => {
                        return <FableItemTopic key={i} className="mr-2 cursor-pointer break-all" onClick={() => navigate(`/topic/${item.topicIds[i]}`)}>
                            {topic}
                        </FableItemTopic>
                    })
                }
                </Box>
            </>
        }
        else {
            return <>
                <Box className="flex">
                    <FableItemText className="cursor-pointer" onClick={() => navigate(`/profile/${item.authorId}`)}>
                        {item.author}
                    </FableItemText>
                    <FableItemText className="ml-auto">
                        <AspectRatioOutlinedIcon className="cursor-pointer" onClick={() => setViewerOpen(true)}/>
                    </FableItemText>
                </Box>
                <FableItemTextLarge className="cursor-pointer" onClick={() => navigate(`/fable/${item.id}`)}>
                    {item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}
                </FableItemTextLarge>
                <Box className="pt-24" />
                <FableItemText className="flex">
                    {
                        authCtx.isLogin() === true ?
                        <FavoriteBorderIcon className="cursor-pointer" color={item.isLikedByMe ? "error" : ""} onClick={handleLike} />
                        :
                        <FavoriteBorderIcon />
                    }
                    <p className="ml-1 mr-5">
                        {item.likes}
                    </p>
                    <ModeCommentOutlinedIcon />
                    <p className="ml-1 mr-5">
                        {item.reply}
                    </p>
                    <PlayCircleOutlineOutlinedIcon />
                    <p className="ml-1 mr-5">
                        {item.view}
                    </p>
                    <span className="ml-auto" />
                    <MoreHorizOutlinedIcon className="cursor-pointer" onClick={(e) => menuCtx.showMoreMenu(item, refreshItem, e)} />
                </FableItemText>
            </>
        }
    }

    const renderFooter = () => {
        return <SecondaryText className="flex">
            {
                comments ? 
                <FableCommentText className="w-full flex px-6 py-[10px] cursor-pointer" onClick={() => setComments(false)}>
                    <CloseIcon />
                    <span className="pr-2" />
                    Close
                </FableCommentText>
                : 
                <FableCommentText className="w-full flex px-6 py-[10px] cursor-pointer" onClick={() => setComments(true)}>
                    Your reply here...
                </FableCommentText>
            }
            {isDesktop && <Box className="py-[10px] flex">
                {
                    authCtx.isLogin() === true ?
                    <FavoriteBorderIcon className="cursor-pointer" color={item.isLikedByMe ? "error" : ""} onClick={handleLike} />
                    :
                    <FavoriteBorderIcon />
                }
                <p className="ml-1 mr-3">
                    {item.likes}
                </p>
                <ModeCommentOutlinedIcon />
                <p className="ml-1 mr-3">
                    {item.reply}
                </p>
                <PlayCircleOutlineOutlinedIcon />
                <p className="ml-1 mr-3">
                    {item.view}
                </p>
                <AspectRatioOutlinedIcon className="cursor-pointer" onClick={() => setViewerOpen(true)} />
                <span className="ml-3" />
                <MoreHorizOutlinedIcon className="cursor-pointer" onClick={(e) => menuCtx.showMoreMenu(item, refreshItem, e)} />
                <span className="ml-3" />
            </Box>}
        </SecondaryText>
    }
    
    return <FableItemBg className="rounded-[10px] mb-8">
        <Box className="rounded-t-[10px] bg-center bg-cover relative" style={{backgroundImage: `url(${item.photo})`}}>
            <Box className="rounded-t-[10px] p-3 xl:p-4" style={{background: "linear-gradient(360deg, rgba(0, 0, 0, 0.86) 12%, rgba(0, 0, 0, 0) 100%)"}}>
            { renderContent() }
            </Box>
            <Box className="absolute top-[50%] translate-y-[-50%] right-[40px] xl:right-[60px]">
                <IconButton sx={{
                    "svg": {
                        fontSize: size,
                        color: "#DADADA"
                    }
                }}
                onClick={() => dialogCtx.setPlaying(item, !playing)}
                >
                    {
                        playing ?
                        <PauseCircleIcon size={size} sx={{/* fill: "url(#linearColors)" */}} />
                        :
                        <PlayCircleIcon size={size} sx={{/* fill: "url(#linearColors)" */}}/>
                    }
                </IconButton>
            </Box>
        </Box>
        { renderFooter() }
        { renderComment() }
        {viewerOpen && (
            <ImageViewer
            src={[item.photo]}
            disableScroll={false}
            backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
                zIndex: "100"
            }}
            closeOnClickOutside={true}
            onClose={() => setViewerOpen(false)}
            />
        )}
    </FableItemBg>
}

export function FableSmallItem({item}) {
    const dialogCtx = useContext(DialogContext);

    const navigate = useNavigate();

    const playing = (dialogCtx.playingStatus === true && dialogCtx.playingFable?.id === item.id)

    return <FableItemBg className="rounded-[10px] mb-8">
        <Box className="rounded-[10px] bg-center bg-cover relative" style={{backgroundImage: `url(${item.photo})`}}>
            <Box className="rounded-[10px] p-4" style={{background: "linear-gradient(360deg, rgba(0, 0, 0, 0.86) 12%, rgba(0, 0, 0, 0) 100%)"}}>
                <FableItemText className="pb-1 cursor-pointer" onClick={() => navigate(`/fable/${item.id}`)}>
                    {item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}
                </FableItemText>
                <FableItemTextSmall className="pb-1 cursor-pointer" onClick={() => navigate(`/profile/${item.authorId}`)}>
                    {item.author}
                </FableItemTextSmall>
                <FableItemTextSmall className="flex">
                    <ModeCommentOutlinedIcon />
                    <span className="ml-2 mr-4">
                        {item.reply}
                    </span>
                    <PlayCircleOutlineOutlinedIcon />
                    <span className="ml-2 mr-4">
                        {item.view}
                    </span>
                </FableItemTextSmall>
            </Box>
            <Box className="absolute top-[50%] translate-y-[-50%] right-[10px]">
                <IconButton sx={{
                    "svg": {
                        fontSize: 48,
                        color: "#DADADA"
                    }
                }}
                onClick={() => dialogCtx.setPlaying(item, !playing)}>
                    {
                        playing ?
                        <PauseCircleIcon size={48} sx={{/* fill: "url(#linearColors)" */}} />
                        :
                        <PlayCircleIcon size={48} sx={{/* fill: "url(#linearColors)" */}} />
                    }
                </IconButton>
            </Box>
        </Box>
    </FableItemBg>
}

export function FableSearchItem({item}) {
    const navigate = useNavigate();

    return <FableItemBg className="rounded-[10px]">
        <Box className="rounded-[10px] bg-center bg-cover relative cursor-pointer" style={{backgroundImage: `url(${item.cover})`}} onClick={() => navigate(`/fable/${item.id}`)}>
            <Box className="rounded-[10px] p-4" style={{background: "linear-gradient(360deg, rgba(0, 0, 0, 0.86) 12%, rgba(0, 0, 0, 0) 100%)"}}>
                <Box className="pt-12" />
                <FableItemText className="pb-1">
                    {item.username}
                </FableItemText>
                <FableItemTextLarge className="pb-4">
                    {item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}
                </FableItemTextLarge>
                <Box className="flex">
                {
                    item.topics.map((topic, i) => {
                        return <FableItemTopic key={i} className="mr-2">
                            {topic}
                        </FableItemTopic>
                    })
                }
                </Box>
            </Box>
        </Box>
    </FableItemBg>
}