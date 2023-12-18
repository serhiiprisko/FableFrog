
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";
import { PrimaryTextSmall, SecondaryText } from "../../Components";
import ContentHeader from "../ContentHeader";
import FableContainer from "../FableContainer";

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export default function Content() {
    const { id } = useParams();

    return <Box className="w-full px-4 xl:px-10">
        <ContentHeader />
        <Box className="pt-10 hidden xl:flex xl:invisible">
            <Box className="mx-auto flex">
                <PrimaryTextSmall>Trending</PrimaryTextSmall>
                <SecondaryText className="ml-1">
                    <ArrowLeftIcon />
                    Following
                </SecondaryText>
            </Box>
        </Box>
        <Box className="pb-10" />
        <FableContainer type="SINGLE" value={id} />
    </Box>;
}