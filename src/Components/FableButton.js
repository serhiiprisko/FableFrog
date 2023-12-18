
import styled from "styled-components";

import { ButtonText } from "./FableText";

const Button = styled(ButtonText)`
    cursor: pointer;
    padding: 10px 20px;

    width: fit-content;
    background: ${props => props.theme.highlightColor};
    border-radius: 8px;
    text-align: center;
`;

export const InvertButton = styled(FableButton)`
    border: 2px solid ${props => props.theme.highlightColor};
    color: ${props => props.theme.highlightColor};
    background: transparent;
`

export const ShareButton = styled(FableButton)`
    border: 2px solid ${props => props.theme.primaryColor};
    color: ${props => props.theme.primaryColor};
    background: transparent;

    svg {
        font-size: 22px !important;
    }

    @media (max-width: 1280px) {
        padding: 4px 16px;
    }
`

export const PlaySpeedButton = styled(FableButton)`
    border: 1px solid ${props => props.theme.secondaryColor};
    color: ${props => props.theme.secondaryColor};
    background: transparent;

    width: 119px;
`

export function FableButton(props) {
    return <Button {...props}>
        {props.children}
    </Button>
}