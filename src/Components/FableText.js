
import styled from "styled-components";

export const PrimaryText = styled('div')`
    font-style: normal;
    /*font-weight: 600;*/
    font-size: 17px;
    line-height: 22px;
    color: ${props => props.theme.primaryColor};

    letter-spacing: 0.004em;

    svg {
        font-size: 22px;
        color: ${props => props.theme.primaryColor};
    }
`;

export const PrimaryTextWithMobile = styled(PrimaryText)`
    @media (max-width: 1280px) {
        font-size: 14px;

        svg {
            font-size: 14px;
        }
    }
`

export const PrimaryTextLarge = styled(PrimaryText)`
    font-size: 24px;
    line-height: 30px;

    svg {
        font-size: 30px;
    }
`;

export const PrimaryTextLargeWithMobile = styled(PrimaryTextLarge)`
    @media (max-width: 1280px) {
        font-size: 17px;
    }
`;

export const PrimaryTextSmall = styled(PrimaryText)`
    font-size: 13px;
`;

export const SecondaryText = styled('div')`
    font-style: normal;
    /*font-weight: 600;*/
    font-size: 13px;
    line-height: 22px;
    color: ${props => props.theme.secondaryColor};

    letter-spacing: 0.004em;

    svg {
        font-size: 22px;
        color: ${props => props.theme.secondaryColor};
    }
`;

export const SecondaryTextWithMobile = styled(SecondaryText)`
    @media (max-width: 1280px) {
        line-height: 16px;

        svg {
            font-size: 16px;
        }
    }
`

export const SecondaryTextSmall = styled(SecondaryText)`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;

    svg {
        font-size: 16px;
    }
`;

export const FableCommentText = styled(SecondaryText)`
    font-size: 17px;
    color: ${props => props.theme.inputTextColor};
`;

export const FableCommentLarge = styled(SecondaryText)`
    font-size: 27px;
`;

export const FableComment = styled(SecondaryText)`
    font-size: 17px;
`;

export const ButtonText = styled('div')`
    font-style: normal;
    /*font-weight: 600;*/
    font-size: 13px;
    line-height: 22px;
    color: ${props => props.theme.whiteColor};

    letter-spacing: 0.004em;

    svg {
        font-size: 22px;
    }
`;

export const FableItemText = styled('div')`
    font-style: normal;
    /*font-weight: 600;*/
    font-size: 17px;
    line-height: 22px;
    color: ${props => props.theme.textColor};

    letter-spacing: 0.004em;

    svg {
        font-size: 22px;
    }

    @media (max-width: 1280px) {
        font-size: 11px;
    }
`;

export const FableItemTextLarge = styled(FableItemText)`
    font-size: 27px;

    @media (max-width: 1280px) {
        font-size: 17px;
    }
`;

export const FableItemTextSmall = styled(FableItemText)`
    font-size: 12px;
`;

export const FableTopicText = styled(FableItemText)`
    font-size: 14px;
`;

export const FableTopicTextLarge = styled(FableItemText)`
    font-size: 24px;
`;

export const ShareTopicText = styled('div')`
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 22px;

    display: inline-flex;
    color: ${props => props.theme.primaryColor};
    background-color: ${props => props.theme.secondaryColor}20;
    border-radius: 60px;
    padding: 10px 20px;

    letter-spacing: 0.004em;

    @media (max-width: 1280px) {
        padding: 4px 16px;
    }
`;

export const ShareTopicButton = styled('div')`
    cursor: pointer;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;

    color: ${props => props.theme.primaryColor};
    background-color: ${props => props.theme.secondaryColor}20;
    border-radius: 60px;
    padding: 10px 20px;
    text-align: center;

    letter-spacing: 0.004em;
`;

export const InputText = styled('div')`
    font-style: normal;
    /*font-weight: 600;*/
    font-size: 17px;
    line-height: 22px;
    color: ${props => props.theme.inputTextColor};

    letter-spacing: 0.004em;

    @media (max-width: 1280px) {
        font-size: 13px;
    }
`;