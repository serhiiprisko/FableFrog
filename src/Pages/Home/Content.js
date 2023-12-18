
import { useState } from "react";

import { Box, useMediaQuery } from "@mui/material";
import { PrimaryTextSmall, SecondaryText } from "../../Components";
import ContentHeader from "../ContentHeader";
import FableContainer from "../FableContainer";
import MobileTrending from "../MobileTrending";

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function Content() {
    const isDesktop = useMediaQuery('(min-width:1280px)');
    const [value, setValue] = useState("Trending");

    return <Box className="w-full px-4 xl:px-10">
        <ContentHeader />
        <Box className="pt-10 py-4 xl:py-10 flex">
            <Box className="mx-auto flex">
        {
            value === "Trending" ?
            <>
                <PrimaryTextSmall>On the Rise</PrimaryTextSmall>
                <SecondaryText className="ml-1 cursor-pointer" onClick={() => setValue("Following")}>
                    <ArrowLeftIcon />
                    Tracking
                </SecondaryText>
            </>
            :
            <>
                <SecondaryText className="cursor-pointer" onClick={() => setValue("Trending")}>
                    On the Rise
                    <ArrowRightIcon />
                </SecondaryText>
                <PrimaryTextSmall className="ml-1">
                    Tracking
                </PrimaryTextSmall>
            </>
        }
            </Box>
        </Box>
        {!isDesktop && <MobileTrending />}
        <FableContainer type="HOME" value={value} />
    </Box>;
}