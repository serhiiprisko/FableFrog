
import { useContext, useEffect, useState } from "react";

import { Box } from "@mui/material";
import styled from "styled-components";
import { SecondaryText, SecondaryTextSmall, PrimaryTextLargeWithMobile, PrimaryTextWithMobile } from "../Components";

import WhatshotIcon from '@mui/icons-material/Whatshot';
import PeopleIcon from '@mui/icons-material/People';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import DialogContext from "../contexts/dialogContext";
import AuthContext from "../contexts/authContext";
import { _getTrending, _subscribeTopic } from "../apis";

const TrendingButton = styled(PrimaryTextLargeWithMobile)`
    width: 240px;
    height: 56px;
    margin-left: auto;
    margin-right: auto;
    background-color: ${props => props.theme.bgColor};
    border: 1px solid ${props => props.theme.secondaryColor};
    /* filter: drop-shadow(0px 16px 40px rgba(34, 41, 46, 0.3)); */
    border-radius: 8px;
    display: flex;
`;

const TrendingBg = styled(Box)`
    background: ${props => props.theme.bgColor};
    box-shadow: 0px 4px 40px rgba(34, 41, 46, 0.1);
    border-radius: 0 0 8px 8px;
    border: 1px solid ${props => props.theme.secondaryColor};
    border-top: 0px;

    width: 240px;
    margin-left: auto;
    margin-right: auto;
`;

export default function MobileTrending() {
    const dialogCtx = useContext(DialogContext);
    const authCtx = useContext(AuthContext);

    const [details, setDetails] = useState(null);
    const [open, setOpen] = useState(false);

    const handleTrack = (item) => {
        _subscribeTopic(authCtx.getUserId(), item.id, false)
        .then((res) => {
            if (res.success === 1) {
                setOpen(false);
            }
            else
                dialogCtx.showError(res.message);
        })
        .catch((e) => {
            dialogCtx.showError(e.message);
        })
    }

    useEffect(() => {
        if (open) {
            setDetails(null);
            _getTrending(authCtx.getUserId())
            .then((res) => {
                setDetails(res);
            })
        }
    }, [open])

    const renderTopic = (item, i) => {
        return <Box className="w-full grid pb-8" gridTemplateColumns="2fr 1fr auto" key={i}>
            <PrimaryTextWithMobile>
                {item.title}
            </PrimaryTextWithMobile>
            <SecondaryTextSmall>
                <PeopleIcon />
                <span className="pl-1" />
                {item.users}
            </SecondaryTextSmall>
            <SecondaryText className="cursor-pointer" onClick={() => handleTrack(item)}>
                Track
            </SecondaryText>
        </Box>
    }

    return <Box className="mb-8 h-[56px]">
        <TrendingButton onClick={() => setOpen(!open)}>
            <Box className="m-auto">
                Trending
                <span className="pl-4" />
                <WhatshotIcon className="!text-[24px]" />
            </Box>
            <SecondaryText className="inline relative h-[22px] top-[16px] right-[12px]">
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </SecondaryText>
        </TrendingButton>
        {open && <TrendingBg className="relative top-[-12px] z-10 pt-8 px-6">
        {
            details?.topics.map((item, i) => {
                return renderTopic(item, i);
            })
        }
        </TrendingBg>}
        
    </Box>
}