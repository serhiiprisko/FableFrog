
import { useContext, useEffect, useState } from "react";

import { Box } from "@mui/material";
import { FableButton, PrimaryText, PrimaryTextLarge, SecondaryText, SecondaryTextSmall } from "../Components";

import PersonIcon from '@mui/icons-material/Person';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PeopleIcon from '@mui/icons-material/People';

import DialogContext from "../contexts/dialogContext";
import AuthContext from "../contexts/authContext";
import { _getTrending, _subscribeTopic } from "../apis";

export default function Trending() {
    const dialogCtx = useContext(DialogContext);
    const authCtx = useContext(AuthContext);

    const [details, setDetails] = useState(null);

    const handleTrack = (item) => {
        _subscribeTopic(authCtx.getUserId(), item.id, false)
        .then((res) => {
            if (res.success === 1) {

            }
            else
                dialogCtx.showError(res.message);
        })
        .catch((e) => {
            dialogCtx.showError(e.message);
        })
    }

    useEffect(() => {
        _getTrending(authCtx.getUserId())
        .then((res) => {
            setDetails(res);
        })
    }, [])

    const renderTopic = (item, i) => {
        return <Box className="w-full grid pb-8" gridTemplateColumns="2fr 1fr auto" key={i}>
            <PrimaryText>
                {item.title}
            </PrimaryText>
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

    return <Box className="max-w-[240px] min-w-[240px]">
        {
            authCtx.isLogin() === true ? 
            <FableButton className="ml-auto invisible">
                Join Now
            </FableButton> :
            <FableButton className="ml-auto" onClick={() => dialogCtx.showLogin()}>
                <PersonIcon />
                <span className="pr-3" />
                Join Now
            </FableButton>
        }
        <PrimaryTextLarge className="pt-14 pb-10 text-center">
            Trending
            <span className="pl-4" />
            <WhatshotIcon className="!text-[24px]" />
        </PrimaryTextLarge>
        {
            details?.topics.map((item, i) => {
                return renderTopic(item, i);
            })
        }
    </Box>;
}