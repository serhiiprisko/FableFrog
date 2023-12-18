
import { Box } from "@mui/material";
import { FableButton, PrimaryText, PrimaryTextLarge } from "../../Components";

export default function About() {
    return <Box className="max-w-[240px] min-w-[240px]">
        <FableButton className="ml-auto invisible">
            Join Now
        </FableButton>
        <PrimaryTextLarge className="pt-14 pb-4 invisible">
            Topics
        </PrimaryTextLarge>
        <PrimaryText className="break-word !font-[400]">
            <b>About Topics</b>
            <br/><br/>
            The various topics keywords will help you find fables of similar nature.
            <br/><br/>
            Tracking a topic will send fables of that topic to your home page for listening.
            <br/><br/>
            This will make it easier for you to <b>find fables</b> instead of having to go to the specific topic page in order to find them.
        </PrimaryText>
    </Box>;
}