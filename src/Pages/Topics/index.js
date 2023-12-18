
import { useMediaQuery } from "@mui/material";

import Navigation from "../Navigation";
import Content from "./Content";
import About from "./About";
import MobileNavigation from "../MobileNavigation";

export default function Topics() {
    const isDesktop = useMediaQuery('(min-width:1280px)');
 
    if (isDesktop) {
        return <>
            <Navigation />
            <Content />
            <About />
        </>
    }
    else {
        return <>
            <MobileNavigation />
            <Content />
        </>
    }
}