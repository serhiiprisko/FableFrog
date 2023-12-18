
import { useState, useContext } from "react";

import { Box, useMediaQuery } from "@mui/material";
import { PrimaryTextLarge, SecondaryText, FableButton, FableContactInput } from "../../Components";
import ContentHeader from "../ContentHeader";

import { _contactUs } from "../../apis";
import DialogContext from "../../contexts/dialogContext";

export default function Content() {
    const isDesktop = useMediaQuery('(min-width:1280px)');
    const dialogCtx = useContext(DialogContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSend = () => {
        _contactUs(name, email, message)
        .then((res) => {
            dialogCtx.showToast(res.email)
        })
        .catch((err) => {
            dialogCtx.showError(err)
        })
    }

    return <Box className="w-full px-4 xl:px-10">
        {isDesktop && <ContentHeader />}
        <Box className="xl:py-28 flex">
            <Box className="mr-16 hidden xl:block">
                <img src="/dummy.png" alt="dummy" />
            </Box>
            <Box>
                <PrimaryTextLarge className="pb-4">
                    Contact our Service
                </PrimaryTextLarge>
                <SecondaryText className="pb-8 xl:pb-4">
                    Need help? Got a question?
                    <br/>
                    Just send us a message an we will get back to you as soon as possible.
                </SecondaryText>
                <Box className="pb-4 grid xl:grid-cols-2 gap-2">
                    <FableContactInput
                        placeholder="Full Name *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FableContactInput
                        placeholder="Email Address *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Box className="pb-8 xl:pb-4">
                    <FableContactInput
                        multiline
                        rows={4}
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </Box>
                <FableButton className="!w-[170px]" onClick={handleSend}>
                    Contact us
                </FableButton>
            </Box>
        </Box>
    </Box>;
}