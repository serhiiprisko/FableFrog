
import { useContext } from 'react';

import { Box, Dialog } from '@mui/material';
import { SecondaryText } from './FableText';
import ThemeContext from '../contexts/themeContext';

import CloseIcon from '@mui/icons-material/Close';

export default function FableDialog(props) {
    const themeCtx = useContext(ThemeContext);
    const theme = themeCtx.currentTheme();

    return <Dialog {...props}
        sx={{
            "& .MuiDialog-paper": {
                borderRadius: "10px",
                background: `${theme.bgColor}BB`,
                backdropFilter: "blur(30px)",
                width: "100%",
                maxWidth: props.maxWidth ? props.maxWidth : "400px"
            }
        }}>
        <Box className="pb-4" />
        <SecondaryText className="absolute top-[12px] right-[12px] cursor-pointer" onClick={props.onClose}>
            <CloseIcon />
        </SecondaryText>
        {props.children}
    </Dialog>
}