
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { Box } from "@mui/material";
import { PrimaryText, SecondaryText } from '../Components';
import Switch from 'react-switch';
import styled from 'styled-components';

import HomeIcon from '@mui/icons-material/Home';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DownloadIcon from '@mui/icons-material/Download';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import CircleIcon from '@mui/icons-material/Circle';

import ThemeContext from '../contexts/themeContext';
import DialogContext from '../contexts/dialogContext';
import AuthContext from "../contexts/authContext";

const NavigationButtonItem = styled(PrimaryText)`
    cursor: pointer;
    padding: 10px;
    width: 240px;

    &:hover {
        border-radius: 10px;
        background-color: ${props => props.theme.navigationBgColor};
    }
`;

function NavigationButton({icon, title, onClick, url}) {
    const navigate = useNavigate();
    return <NavigationButtonItem onClick={onClick ? onClick : () => navigate(url)}>
        {icon}
        <span className="pr-4" />
        {title}
    </NavigationButtonItem>;
}

const DownloadButton = styled(SecondaryText)`
    cursor: pointer;
    margin: 20px auto 20px 0px;
    padding: 10px 20px;

    width: fit-content;
    background: ${props => props.theme.navigationBgColor};
    border-radius: 30px;
`;

const LinkButton = styled(SecondaryText)`
    cursor: pointer;
    margin-left: 10px;
`;

export default function Navigation() {
    const navigate = useNavigate();

    const themeCtx = useContext(ThemeContext);
    const dialogCtx = useContext(DialogContext);
    const authCtx = useContext(AuthContext);
    const theme = themeCtx.currentTheme();
    
    const renderDownloadButton = () => {
        return <DownloadButton onClick={() => dialogCtx.showDownload()}>
            <DownloadIcon />
            <span className="pr-3" />
            Download the App
        </DownloadButton>
    }

    return <Box>
        <img className="min-w-[64px] mb-10" src="./logo.svg" alt="logo" />
        <Box className="pb-2">
            <NavigationButton icon={<HomeIcon />} title="Home" url="/home" />
        </Box>
        {
            authCtx.isLogin() === false ? "" :
            <>
                <Box className="pb-2">
                    <NavigationButton icon={<DiamondOutlinedIcon />} title="Suggestions" url={`/suggestions`} />
                </Box>
                <Box className="pb-2">
                    <NavigationButton icon={<PersonOutlineIcon />} title="Profile" url={`/profile/${authCtx.getUserId()}`} />
                </Box>
                <Box className="pb-2">
                    <NavigationButton icon={<NotificationsNoneIcon />} title="Recent User Activity" url="/recent-user-activity" />
                </Box>
            </>
        }
        <Box className="pb-2">
            <NavigationButton icon={<ZoomInIcon />} title="Topics" url="/topics" />
        </Box>
        {
            authCtx.isLogin() === false ? "" :
            <>
                <Box className="pb-2">
                    <NavigationButton icon={<ExitToAppIcon />} title="Log Out" onClick={() => authCtx.logout()} />
                </Box>
            </>
        }
        <Box className="pt-8" sx={{"svg": {color: theme.darkColor}}}>
            <Switch 
                checked={themeCtx.isDark()}
                onChange={() => themeCtx.switchTheme()}
                onColor={theme.primaryColor}
                offColor={theme.navigationBgColor}
                onHandleColor="none"
                offHandleColor="none"
                activeBoxShadow="none"
                width={64}
                height={28}
                borderRadius={28}
                handleDiameter={38}
                checkedIcon={
                    <Box className="w-full h-full text-center pt-[1px]">
                        <DarkModeIcon />
                    </Box>
                }
                uncheckedIcon={
                    <Box className="w-full h-full text-center pt-[1px]">
                        <DarkModeOutlinedIcon />
                    </Box>
                }
                checkedHandleIcon={
                    <Box className="w-full h-full text-center p-[6px] pl-[2px]">
                        <CircleIcon />
                    </Box>
                }
                uncheckedHandleIcon={
                    <Box className="w-full h-full text-center p-[6px] pr-[2px]">
                        <CircleIcon />
                    </Box>
                }
            />
        </Box>
        { renderDownloadButton() }
        <Box className="flex">
            <LinkButton onClick={() => navigate("/contact")}>Contact Us</LinkButton>
            <LinkButton onClick={() => navigate("/terms-and-conditions")}>Terms & Conditions</LinkButton>
        </Box>
        <Box className="flex">
            <LinkButton onClick={() => navigate("/copyright")}>Copyright Policy</LinkButton>
            <LinkButton onClick={() => navigate("/privacy")}>Private Policy</LinkButton>
        </Box>
    </Box>;
}