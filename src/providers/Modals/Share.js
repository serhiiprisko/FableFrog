
import { useContext } from 'react';

import { Box, useMediaQuery } from '@mui/material';
import { FableDialog, PrimaryTextLarge, ShareButton } from '../../Components';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkIcon from '@mui/icons-material/Link';
import ThemeContext from '../../contexts/themeContext';
import DialogContext from '../../contexts/dialogContext';

export default function Share({show, setShow, title, url}) {
    const isDesktop = useMediaQuery('(min-width:1280px)');
    const dialogCtx = useContext(DialogContext);
    const themeCtx = useContext(ThemeContext);
    const theme = themeCtx.currentTheme();

    const handleClose = () => {
        setShow(false);
    };

    const handleWhatsapp = () => {
        var win = window.open(`https://wa.me/?text=Here I found a fable: ${title} ${url}`, '_blank');
        /*if (win)
            win.focus();
        else
            dialogCtx.showError('Please allow popups for this website');*/
    }

    const handleFaceBook = () => {
        var width = 626;
        var height = 436;
        var sharerUrl = `https://www.facebook.com/sharer.php?u=${url}&t=Here I found a fable: ${title}`;
        var l = window.screenX + (window.outerWidth - width) / 2;
        var t = window.screenY + (window.outerHeight - height) / 2;
        var winProps = ['width='+width,'height='+height,'left='+l,'top='+t,'status=no','resizable=yes','toolbar=no','menubar=no','scrollbars=yes'].join(',');
        var win = window.open(sharerUrl, 'fbShareWin', winProps);
    }

    const handleTwitter = () => {
        var width = 626;
        var height = 436;
        var sharerUrl = `https://twitter.com/share?url=${url}&text=Here I found a fable: ${title}`;
        var l = window.screenX + (window.outerWidth - width) / 2;
        var t = window.screenY + (window.outerHeight - height) / 2;
        var winProps = ['width='+width,'height='+height,'left='+l,'top='+t,'status=no','resizable=yes','toolbar=no','menubar=no','scrollbars=yes'].join(',');
        var win = window.open(sharerUrl, 'fbShareWin', winProps);
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(url);
        dialogCtx.showToast("Link Copied");
    }
    
    return <FableDialog
        open={show}
        onClose={handleClose}
        maxWidth={480}>
        <Box className="p-8">
            <PrimaryTextLarge className="pb-8 text-center">
                Share this Fable
            </PrimaryTextLarge>
            <Box className="flex" sx={{
                "svg": {
                    fontSize: isDesktop ? "46px" : "32px",
                    color: theme.primaryColor
                }
            }}>
                <WhatsAppIcon className="my-auto cursor-pointer" onClick={handleWhatsapp} />
                <Box className="mr-4 xl:mr-8" />
                <FacebookIcon className="my-auto cursor-pointer" onClick={handleFaceBook} />
                <Box className="mr-4 xl:mr-8" />
                <TwitterIcon className="my-auto cursor-pointer" onClick={handleTwitter} />
                <Box className="mr-4 xl:mr-8" />
                <Box className="mr-auto" />
                <ShareButton onClick={handleCopyLink}>
                    <LinkIcon />
                    <span className="pr-1" />
                    Copy Link
                </ShareButton>
            </Box>
        </Box>
    </FableDialog>
}