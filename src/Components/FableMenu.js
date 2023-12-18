
import { useContext } from 'react';

import { Menu } from '@mui/material';
import ThemeContext from '../contexts/themeContext';

export default function FableMenu(props) {
    const themeCtx = useContext(ThemeContext);
    const theme = themeCtx.currentTheme();

    return <Menu {...props}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        sx={{
            "& .MuiPaper-root": {
                minWidth: 240,
            },
            "& .MuiMenuItem-root": {
                color: theme.darkColor,
                /*fontWeight: 600*/
                "svg": {
                    color: theme.darkColor,
                }
            },
            ...props.sx
        }}>
        {props.children}
    </Menu>
}