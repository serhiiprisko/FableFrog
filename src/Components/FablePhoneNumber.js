
import { useContext } from 'react';

import MuiPhoneNumber from 'material-ui-phone-number';
import ThemeContext from '../contexts/themeContext';

export default function FablePhoneNumber(props) {
    const themeCtx = useContext(ThemeContext);
    const theme = themeCtx.currentTheme();

    return <MuiPhoneNumber
        defaultCountry={'us'}
        variant="outlined"
        fullWidth
        sx={{
            "& .MuiInputBase-root": {
                borderRadius: "10px 0 0 10px"
            },
            "& .MuiInputBase-input": {
                color: theme.primaryColor,
                "&:disabled": {
                    WebkitTextFillColor: `${theme.primaryColor}60`,
                }
            },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: `${theme.primaryColor}40 !important`,
                borderRight: `0 !important`,
            }
        }}
        { ...props } />
}