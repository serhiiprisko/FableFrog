
import { useContext, useEffect, useState } from "react";

import { Box, useMediaQuery } from "@mui/material";
import { PrimaryTextLarge, PrimaryText, FableItemBg } from "../../Components";
import ContentHeader from "../ContentHeader";

import AuthContext from "../../contexts/authContext";
import DialogContext from "../../contexts/dialogContext";
import { _getSuggestions } from "../../apis";

function Suggestions({item}) {
    const dialogCtx = useContext(DialogContext);
    
    return <FableItemBg className="flex w-full p-4 mb-6 rounded-[10px] cursor-pointer" onClick={() => dialogCtx.showShareYourFable(item.title)}>
        <PrimaryText>
            {item.title}
        </PrimaryText>
    </FableItemBg>
}

export default function Content() {
    const isDesktop = useMediaQuery('(min-width:1280px)');
    const authCtx = useContext(AuthContext);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        _getSuggestions(authCtx.getUserId())
        .then((res) => {
            setDetails(res);
        })
    }, []);

    return <Box className="w-full px-4 xl:px-10">
        {isDesktop && <ContentHeader />}
        <PrimaryTextLarge className="pt-14 pb-4">
            Suggestions
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            Need some ideas? Browse some of our fable suggestions!
        </PrimaryText>
        {
            details?.suggestions.map((item, i) => {
                return <Suggestions key={i} item={item} />
            })
        }
    </Box>;
}