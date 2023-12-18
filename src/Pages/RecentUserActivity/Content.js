
import { useContext, useEffect, useState } from "react";

import { Box, useMediaQuery } from "@mui/material";
import { PrimaryTextLarge, PrimaryTextWithMobile, SecondaryTextWithMobile } from "../../Components";
import ContentHeader from "../ContentHeader";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AuthContext from "../../contexts/authContext";
import { _getUserActivity } from "../../apis";

function Activity({item}) {
    return <Box className="flex mb-8">
        <Box className="rounded-[10px] my-auto">
            <Box className="rounded-[10px] bg-center bg-cover relative" style={{backgroundImage: `url(${item.photo})`}}>
                <Box className="rounded-[10px] p-[36px] xl:p-12 bg-[#00000070]">
                </Box>
            </Box>
        </Box>
        <Box className="ml-8 my-auto">
            <PrimaryTextWithMobile className="pb-2">
                <div dangerouslySetInnerHTML={{__html: item.description}} />
            </PrimaryTextWithMobile>
            <SecondaryTextWithMobile className="flex">
                <AccessTimeIcon />
                <span className="pr-3" />
                <div>{item.time}</div>
            </SecondaryTextWithMobile>
        </Box>
    </Box>
}

export default function Content() {
    const isDesktop = useMediaQuery('(min-width:1280px)');
    const authCtx = useContext(AuthContext);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        _getUserActivity(authCtx.getUserId())
        .then((res) => {
            setDetails(res);
        })
    }, []);

    return <Box className="w-full px-4 xl:px-10">
        {isDesktop && <ContentHeader />}
        <PrimaryTextLarge className="pt-14 pb-10">
            Recent User Activity
        </PrimaryTextLarge>
        {
            details?.stories.map((item, i) => {
                return <Activity key={i} item={item} />
            })
        }
    </Box>;
}