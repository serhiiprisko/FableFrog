
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";

import Navigation from "../Navigation";
import Content from "./Content";
import History from "../History";
import MobileNavigation from "../MobileNavigation";

export default function RecentUserAcitivy() {
    const isDesktop = useMediaQuery('(min-width:1280px)');
    const { id } = useParams();
 
    if (isDesktop) {
        return <>
            <Navigation />
            <Content />
            <History id={id} />
        </>
    }
    else {
        return <>
            <MobileNavigation />
            <Content />
        </>
    }
}