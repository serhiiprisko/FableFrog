
import { useContext } from "react";
import { useMediaQuery } from "@mui/material";

import Navigation from "../Navigation";
import Content from "./Content";
import History from "../History";
import MobileNavigation from "../MobileNavigation";
import AuthContext from "../../contexts/authContext";

export default function CopyrightPolicy() {
    const isDesktop = useMediaQuery('(min-width:1280px)');
    const authCtx = useContext(AuthContext);

    if (isDesktop) {
        return <>
            <Navigation />
            <Content />
            <History id={authCtx.getUserId()} />
        </>;
    }
    else {
        return <>
            <MobileNavigation />
            <Content />
        </>
    }
}