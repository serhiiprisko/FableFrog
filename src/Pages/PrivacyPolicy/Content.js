
import { Box, useMediaQuery } from "@mui/material";
import { PrimaryTextLarge, PrimaryText } from "../../Components";
import ContentHeader from "../ContentHeader";

export default function Content() {
    const isDesktop = useMediaQuery('(min-width:1280px)');

    return <Box className="w-full px-4 xl:px-10" style={{wordBreak: 'break-word'}}>
        {isDesktop && <ContentHeader />}
        <PrimaryTextLarge className="xl:pt-14 pb-4">
            Privacy Policy of FableFrog
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            FableFrog operates the app.fablefrog.com website, which provides the SERVICE.
            <br/><br/>
            This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service, the FableFrog website.
            <br/><br/>
            If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy. Our Privacy Policy was created with the help of the Privacy Policy Template Generator.
            <br/><br/>
            The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at app.fablefrog.com, unless otherwise defined in this Privacy Policy.
        </PrimaryText>
        <PrimaryTextLarge className="pb-4">
            Information Collection and Use
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you.
        </PrimaryText>
        <PrimaryTextLarge className="pb-4">
            Log Data
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer’s Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
        </PrimaryText>
        <PrimaryTextLarge className="pb-4">
            Cookies
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer’s hard drive.
            <br/><br/>
            Our website uses these "cookies" to collection information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.
            <br/><br/>
            For more general information on cookies, please read "What Are Cookies".
        </PrimaryText>
        <PrimaryTextLarge className="pb-4">
            Service Providers
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            We may employ third-party companies and individuals due to the following reasons:
            <br/><br/>
            <ul className="pl-[40px] list-disc">
                <li>To facilitate our Service;</li>
                <li>To provide the Service on our behalf;</li>
                <li>To perform Service-related services; or</li>
                <li>To assist us in analyzing how our Service is used.</li>
            </ul>
            <br/>
            We want to inform our Service users that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
        </PrimaryText>
        <PrimaryTextLarge className="pb-4">
            Security
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
        </PrimaryText>
        <PrimaryTextLarge className="pb-4">
            Links to Other Sites
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            <br/><br/>
            Children's Privacy
            <br/><br/>
            Our Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.
        </PrimaryText>
        <PrimaryTextLarge className="pb-4">
            Changes to This Privacy Policy
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.
        </PrimaryText>
        <PrimaryTextLarge className="pb-4">
            Contact Us
        </PrimaryTextLarge>
        <PrimaryText className="pb-10">
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
        </PrimaryText>
    </Box>;
}