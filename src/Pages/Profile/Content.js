
import { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Box, MenuItem, useMediaQuery } from "@mui/material";
import { PrimaryTextLarge, FableItemBg, SecondaryText, FableComment, PrimaryTextSmall, InvertButton, FableMenu } from "../../Components";
import ContentHeader from "../ContentHeader";
import FableContainer from "../FableContainer";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import AuthContext from "../../contexts/authContext";
import DialogContext from "../../contexts/dialogContext";

import { _getProfile, _uploadProfile, _uploadCover, _trackUser } from "../../apis";

const HighlightText = styled('span')`
    color: ${props => props.theme.highlightColor};

    svg {
        color: ${props => props.theme.highlightColor};
    }
`;

export default function Content() {
    const isDesktop = useMediaQuery('(min-width:1280px)');
    const { id } = useParams();
    const profileRef = useRef(null);
    const coverRef = useRef(null);

    const authCtx = useContext(AuthContext);
    const dialogCtx = useContext(DialogContext);
    const isMe = authCtx.getUserId() === id;

    const [details, setDetails] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        refreshProfile();
    }, [id])

    const refreshProfile = () => {
        _getProfile(id, authCtx.getUserId())
        .then((res) => {
            setDetails(res);
        })
        .catch((e) => {});
    }

    const handleTrackUser = () => {
        _trackUser(id, authCtx.getUserId())
        .then((res) => {
            refreshProfile();
        })
    }

    const handleUploadProfile = (e) => {
        if (e.target.files.length === 0) return;
        _uploadProfile(id, e.target.files[0])
        .then((res) => {
            if (res.success === 1)
                refreshProfile();
        })
    }

    const handleUploadCover = (e) => {
        if (e.target.files.length === 0) return;
        _uploadCover(id, e.target.files[0])
        .then((res) => {
            if (res.success === 1)
                refreshProfile();
        })
    }

    const handleCoverClick = (e) => {
        if (isMe === false) return;
        e.stopPropagation();
        coverRef.current.value = null;
        coverRef.current.click();
    }

    const handleProfileClick = (e) => {
        if (isMe === false) return;
        e.stopPropagation();
        profileRef.current.value = null;
        profileRef.current.click();
    }

    const handlePlayVoice = () => {
        dialogCtx.playVoiceSample(details.username, "Voice Sample", details.avatar, details.introFile);
    }

    const renderPlayVoice = () => {
        if (typeof(details?.introFile) !== "string")
            return "";
        else
            return <PrimaryTextSmall className="flex flex-col justify-center">
                <HighlightText className="cursor-pointer" onClick={handlePlayVoice}>
                    Play Voice Sample
                    <span className="pr-1" />
                    <PlayCircleOutlineIcon />
                </HighlightText>
            </PrimaryTextSmall>
    }

    const renderOtherProfile = () => {
        return <Box className="pb-8">
            <Box className="flex">
                <PrimaryTextLarge className="mr-auto">
                    {details?.username}
                </PrimaryTextLarge>
                { isDesktop && renderPlayVoice() }
                {
                    authCtx.isLogin() === false ? "" :
                        details?.following ? 
                        <InvertButton className="ml-8" onClick={handleTrackUser}>
                            Untrack
                        </InvertButton> :
                        <InvertButton className="ml-8" onClick={handleTrackUser}>
                            <AddIcon />
                            <span className="pr-1" />
                            Track
                        </InvertButton>
                }
            </Box>
            <FableComment className="my-2">
                {details?.userBio}
            </FableComment>
            <Box className="flex mt-4 xl:mt-0">
                <SecondaryText className="mr-4">
                    Tracked by
                    <HighlightText className="pl-1">
                        {details?.trackedBy}
                    </HighlightText>
                </SecondaryText>
                {!isDesktop && renderPlayVoice()}
            </Box>
        </Box>
    }

    const renderMyProfile = () => {
        const handleClick = (e) => {
            if (details !== null)
                setAnchorEl(e.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleOpenSettings = () => {
            dialogCtx.showEditProfile(details, refreshProfile);
            handleClose();
        }

        const handleAddVoiceSample = () => {
            dialogCtx.showAddVoiceSample();
            handleClose();
        }

        return <Box className="pb-8">
            <Box className="flex">
                <PrimaryTextLarge className="mr-auto">
                    {details?.username}
                </PrimaryTextLarge>
                { isDesktop && renderPlayVoice() }
                <PrimaryTextLarge className="ml-8 cursor-pointer" onClick={handleClick}>
                    <MoreHorizIcon />
                </PrimaryTextLarge>
            </Box>
            <FableComment className="my-2">
                {details?.userBio}
            </FableComment>
            <Box className="flex mt-4 xl:mt-0">
                {!isDesktop && renderPlayVoice()}
            </Box>
            <FableMenu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <MenuItem onClick={handleOpenSettings}>Settings</MenuItem>
                <MenuItem onClick={handleAddVoiceSample}>
                    {details?.introFile === null ? "Add a short voice sample" : "Update a short voice sample"}
                </MenuItem>
            </FableMenu>
        </Box>
    }

    return <Box className="w-full xl:px-10">
        {isDesktop && <ContentHeader />}
        <FableItemBg className="rounded-[10px] xl:mt-14 mb-20 xl:mb-10">
            <Box className="rounded-[10px] bg-center bg-cover relative" style={{backgroundImage: `url(${details?.CoverImage})`}} onClick={handleCoverClick}>
                <Box className="rounded-[10px] min-h-[220px] bg-[#00000020]">
                </Box>
                <FableItemBg className="absolute left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[99px]" onClick={handleProfileClick}>
                    <Box className="w-[128px] h-[128px] bg-center bg-cover rounded-[99px] bg-[#00000020]" style={{backgroundImage: `url(${details?.avatar}`}} />
                </FableItemBg>
            </Box>
        </FableItemBg>
        {
            isMe ?
            <>
                <input
                    type="file"
                    accept="image/*"
                    ref={profileRef}
                    className="hidden"
                    onChange={handleUploadProfile}
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={coverRef}
                    className="hidden"
                    onChange={handleUploadCover}
                />
                { renderMyProfile() }
            </> :
            renderOtherProfile()
        }
        <FableContainer type="PROFILE" value={id} />
    </Box>;
}