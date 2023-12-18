
import { useMediaQuery } from "@mui/material";

import Navigation from "../Navigation";
import Content from "./Content";
import Trending from "../Trending";
import MobileNavigation from "../MobileNavigation";

export default function Fable() {
    const isDesktop = useMediaQuery('(min-width:1280px)');
 
    if (isDesktop) {
        return <>
            <Navigation />
            <Content />
            <Trending />
        </>;
    }
    else {
        return <>
            <MobileNavigation />
            <Content />
        </>
    }
}