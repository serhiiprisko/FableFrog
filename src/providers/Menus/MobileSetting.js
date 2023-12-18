
import { useContext } from 'react';

import { MenuItem, ListItemText, Divider } from '@mui/material';
import { FableMenu } from '../../Components';
import AuthContext from '../../contexts/authContext';

export default function MobileSetting({pos, show, setShow}) {
    const authCtx = useContext(AuthContext);

    const handleClose = (e) => {
        setShow(false);
        e.preventDefault();
    };

    const handleNavigate = (url) => {
        setShow(false);
        window.location.href = '/#/' + url;
    }

    return <FableMenu
        anchorReference="anchorPosition"
        anchorPosition={pos}
        open={show}
        onClose={handleClose}
    >
        {authCtx.isLogin() && <MenuItem onClick={() => authCtx.goToProfile()}>
            <ListItemText>Profile</ListItemText>
        </MenuItem>}
        {authCtx.isLogin() && <Divider />}
        <MenuItem onClick={() => handleNavigate('contact')}>
            <ListItemText>Contact Us</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('terms-and-conditions')}>
            <ListItemText>Terms & Conditions</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('copyright')}>
            <ListItemText>Copyright Policy</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('privacy')}>
            <ListItemText>Private Policy</ListItemText>
        </MenuItem>
        {authCtx.isLogin() && <Divider />}
        {authCtx.isLogin() && <MenuItem onClick={() => authCtx.logout()}>
            <ListItemText>Log Out</ListItemText>
        </MenuItem>}
    </FableMenu>
}