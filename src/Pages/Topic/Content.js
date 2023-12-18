
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, ToggleButton } from "@mui/material";
import { FableItemBg, InvertButton, ShareTopicText, PrimaryTextLargeWithMobile } from "../../Components";
import ContentHeader from "../ContentHeader";
import FableContainer from "../FableContainer";

import AddIcon from '@mui/icons-material/Add';

import AuthContext from "../../contexts/authContext";
import ThemeContext from "../../contexts/themeContext";
import DialogContext from "../../contexts/dialogContext";
import { _getSingleSubTopic, _subscribeTopic } from "../../apis";

function FableShareToggle(props) {
    const themeCtx = useContext(ThemeContext);
    const theme = themeCtx.currentTheme();

    return <ToggleButton
        sx={{
            textTransform: 'none',
            padding: 0,
            borderRadius: 60,
            margin: "0 4px 4px 0",
            "&.Mui-selected": {
                backgroundColor: `${theme.highlightColor}`,
                color: `${theme.whiteColor}`
            },
            "&:hover": {
                backgroundColor: `${theme.secondaryColor}80 !important`
            }
        }}
        { ...props }
    >
        <ShareTopicText className={props.selected ? "!text-inherit" : ""}>
            {props.value.title}
        </ShareTopicText>
    </ToggleButton>
}

export default function Content() {
    const { id } = useParams();
    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);
    const dialogCtx = useContext(DialogContext);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        refreshTopic();
    }, [id])

    const refreshTopic = () => {
        _getSingleSubTopic(authCtx.getUserId(), id)
        .then((res) => {
            if (res.success === 1)
                setDetails(res);
        })
    }

    const handleTrack = () => {
        _subscribeTopic(authCtx.getUserId(), id, true)
        .then((res) => {
            if (res.success === 1)
                refreshTopic();
            else
                dialogCtx.showError(res.message);
        })
        .catch((e) => {
            dialogCtx.showError(e.message);
        })
    }

    const handleChangeTopic = (item) => {
        setDetails(null);
        navigate(`/topic/${item.id}`);
    }

    return <Box className="w-full px-4 xl:px-10">
        <ContentHeader />
        <Box className="mt-14 mb-4">
        {
            details?.topics.map((item, i) => {
                return <FableShareToggle key={i}
                    value={item}
                    selected={id === item.id}
                    onChange={() => handleChangeTopic(item)}
                />
            })
        }
        </Box>
        <FableItemBg className="rounded-[10px] mb-10">
            <Box className="rounded-[10px] bg-center bg-cover relative" style={{backgroundImage: `url(${details?.image})`}}>
                <Box className="rounded-[10px] min-h-[220px] bg-[#00000020]">
                </Box>
            </Box>
        </FableItemBg>
        <Box className="pb-10 flex">
            <PrimaryTextLargeWithMobile className="flex flex-col justify-center mr-auto">
                {details?.title}
            </PrimaryTextLargeWithMobile>
            {
                authCtx.isLogin() === false ? "" :
                    details?.isTracking ? 
                    <InvertButton className="h-fit my-auto ml-8" onClick={handleTrack}>
                        Untrack
                    </InvertButton> :
                    <InvertButton className="h-fit my-auto ml-8" onClick={handleTrack}>
                        <AddIcon />
                        <span className="pr-1" />
                        Track
                    </InvertButton>
            }
        </Box>
        <FableContainer type="TOPIC" value={id} />
    </Box>;
}