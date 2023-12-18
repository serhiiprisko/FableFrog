
import { useContext } from "react";

import { TextField } from "@mui/material";
import styled from "styled-components";

import ThemeContext from "../contexts/themeContext";

export const FableInput = styled.input`
    font-style: normal;
    /*font-weight: 600;*/
    font-size: 17px;
    line-height: 22px;
    color: ${props => props.theme.inputTextColor};

    letter-spacing: 0.004em;

    width: 100%;
    padding: 10px 20px;
    background: ${props => props.theme.inputBgColor};
    border-radius: 10px;
    outline: none;

    @media (max-width: 1280px) {
        font-size: 13px;
    }
`;

export const FableShareInput = styled.textarea`
    font-style: normal;
    /*font-weight: 600;*/
    font-size: 24px;
    line-height: 30px;

    letter-spacing: 0.0036em;

    width: 100%;
    color: ${props => props.theme.primaryColor};
    background: transparent;
    outline: none;
    resize: none;

    @media (max-width: 1280px) {
        font-size: 17px;
    }
`;

export function FableContactInput(props) {
    const themeCtx = useContext(ThemeContext);
    const theme = themeCtx.currentTheme();

    return <TextField
        { ...props }
        fullWidth
        sx={{
            "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "10px",
                borderColor: `${theme.primaryColor}40 !important`,
            },
            "& .MuiInputBase-input": {
                color: theme.primaryColor
            },
            "& .MuiInputAdornment-root": {
                color: theme.primaryColor
            },
            ...props.sx
        }}
    />
}