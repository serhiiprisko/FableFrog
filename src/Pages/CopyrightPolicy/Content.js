
import { Box, useMediaQuery } from "@mui/material";
import { PrimaryTextLarge, PrimaryText } from "../../Components";
import ContentHeader from "../ContentHeader";

export default function Content() {
    const isDesktop = useMediaQuery('(min-width:1280px)');

    return <Box className="w-full px-4 xl:px-10" style={{wordBreak: 'break-word'}}>
        {isDesktop && <ContentHeader />}
        <PrimaryTextLarge className="xl:pt-14 pb-4">
            DMCA policy
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            This Digital Millennium Copyright Act policy ("Policy") applies to the app.fablefrog.com website ("Website"), "FableFrog" mobile application ("Mobile Application") and any of their related products and services (collectively, "Services") and outlines how this Website operator and Mobile Application developer ("Operator", "we", "us" or "our") addresses copyright infringement notifications and how you ("you" or "your") may submit a copyright infringement complaint.
            <br/><br/>
            Protection of intellectual property is of utmost importance to us and we ask our users and their authorized agents to do the same. It is our policy to expeditiously respond to clear notifications of alleged copyright infringement that comply with the United States Digital Millennium Copyright Act ("DMCA") of 1998, the text of which can be found at the U.S. Copyright Office website. This DMCA policy was created with the help of the DMCA policy generator.
        </PrimaryText>
        <PrimaryTextLarge className="pb-4">
            What to consider before submitting a copyright complaint
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            Before submitting a copyright complaint to us, consider whether the use could be considered fair use. Fair use states that brief excerpts of copyrighted material may, under certain circumstances, be quoted verbatim for purposes such as criticism, news reporting, teaching, and research, without the need for permission from or payment to the copyright holder. If you have considered fair use, and you still wish to continue with a copyright complaint, you may want to first reach out to the user in question to see if you can resolve the matter directly with the user.
            <br/><br/>
            Please note that if you are unsure whether the material you are reporting is in fact infringing, you may wish to contact an attorney before filing a notification with us.
            <br/><br/>
            The DMCA requires you to provide your personal information in the copyright infringement notification. If you are concerned about the privacy of your personal information, you may wish to use an agent to report infringing material for you.
        </PrimaryText>
        <PrimaryTextLarge className="pb-4">
            Notifications of infringement
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            If you are a copyright owner or an agent thereof, and you believe that any material available on our Services infringes your copyrights, then you may submit a written copyright infringement notification ("Notification") using the contact details below pursuant to the DMCA. All such Notifications must comply with the DMCA requirements. You may refer to a DMCA takedown notice generator or other similar services to avoid making mistake and ensure compliance of your Notification.
            <br/><br/>
            Filing a DMCA complaint is the start of a pre-defined legal process. Your complaint will be reviewed for accuracy, validity, and completeness. If your complaint has satisfied these requirements, our response may include the removal or restriction of access to allegedly infringing material.
            <br/><br/>
            If we remove or restrict access to materials or terminate an account in response to a Notification of alleged infringement, we will make a good faith effort to contact the affected user with information concerning the removal or restriction of access.
            <br/><br/>
            Notwithstanding anything to the contrary contained in any portion of this Policy, the Operator reserves the right to take no action upon receipt of a DMCA copyright infringement notification if it fails to comply with all the requirements of the DMCA for such notifications.
        </PrimaryText>
        <PrimaryTextLarge className="pb-4">
            Changes and amendments
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            We reserve the right to modify this Policy or its terms relating to the Services at any time, effective upon posting of an updated version of this Policy on the Services. When we do, we will revise the updated date at the bottom of this page.
        </PrimaryText>
        <PrimaryTextLarge className="pb-4">
            Reporting copyright infringement
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            If you would like to notify us of the infringing material or activity, you may send an email to <a href="mailto:contact@fablefrog.com">contact@fablefrog.com</a>.
            <br/><br/>
            This document was last updated on July 10, 2021
        </PrimaryText>
    </Box>;
}