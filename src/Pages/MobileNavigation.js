
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { Box } from "@mui/material";
import styled from 'styled-components';

import HomeIcon from '@mui/icons-material/Home';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

import ThemeContext from '../contexts/themeContext';
import AuthContext from "../contexts/authContext";
import MenuContext from '../contexts/menuContext';

const NavBg = styled(Box)`
    background: ${props => props.theme.bgColor};
    box-shadow: 0px 0px 5px rgba(40, 40, 40, 0.25);
    border-radius: 50px;

    width: 100%;
    height: 100%;
    display: grid;
    grid-auto-flow: column;
    padding-left: 12px;
    padding-right: 12px;

    svg {
        font-size: 32px;
        margin: auto;
        color: ${props => props.theme.secondaryColor};
    }
`;

export default function MobileNavigation() {
    const navigate = useNavigate();

    const themeCtx = useContext(ThemeContext);
    const authCtx = useContext(AuthContext);
    const menuCtx = useContext(MenuContext);
    const theme = themeCtx.currentTheme();

    return <Box className="fixed w-full h-[66px] px-[32px] left-0 bottom-[32px] z-20">
        <NavBg>
            <HomeIcon onClick={() => navigate('/home')} style={{color: theme.primaryColor}} />
            <ZoomInIcon onClick={() => navigate('/topics')} />
            {
                authCtx.isLogin() === false ? "" :
                <>
                    <DiamondOutlinedIcon onClick={() => navigate('/suggestions')} />
                    <NotificationsNoneIcon onClick={() => navigate('/recent-user-activity')} />
                </>
            }
            <MoreHorizOutlinedIcon onClick={(e) => menuCtx.showMobileSetting(e)} />
        </NavBg>
    </Box>;
}