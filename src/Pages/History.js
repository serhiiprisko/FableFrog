
import { useState, useEffect } from "react";

import { Box } from "@mui/material";
import { FableButton, PrimaryText, SecondaryText, FableSmallItem } from "../Components";
import { _getHistory } from "../apis";

import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function History({id}) {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        refreshHistory();
    }, [id]);

    const refreshHistory = () => {
        _getHistory(id)
        .then((res) => {
            if (res.success === 1)
                setDetails(res);
        })
    }

    return <Box className="max-w-[240px] min-w-[240px]">
        <FableButton className="ml-auto invisible">
            Join Now
        </FableButton>
        {
            details === null ? "" :
            <>
                <PrimaryText className="pt-14 pb-8 flex">
                    <AccessTimeIcon />
                    <span className="pr-3" />
                    On site since {details?.createdAt}
                </PrimaryText>
                <SecondaryText className="pb-8">
                    Recently liked
                </SecondaryText>
                {/*<svg width={0} height={0}>
                    <linearGradient id="linearColors" x1="50%" y1="0" x2="0%" y2="100%">
                        <stop offset="26.76%" stopColor="#FFFFFF"/>
                        <stop offset="85.79%" stopColor="#BBBBBB" />
                    </linearGradient>
                </svg>*/}
                {
                    details?.stories.map((item, i) => {
                        return <FableSmallItem key={i} item={item} />
                    })
                }  
            </>
        }
    </Box>;
}