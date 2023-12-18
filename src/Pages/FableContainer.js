
import { useState, useContext, useEffect } from "react";

import { FableItem, PrimaryText } from "../Components";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, CircularProgress } from "@mui/material";
import { _getUserStories } from "../apis";
import AuthContext from "../contexts/authContext";

export default function FableContainer({type, value}) {
    const authCtx = useContext(AuthContext);

    const [details, setDetails] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);
    const [newId, setNewId] = useState(false);

    const fetchMoreData = () => {
        _getUserStories(type, value, authCtx.getUserId(), skip)
        .then((res) => {
            setDetails(arr => [...arr, ...res.stories]);
            setSkip(skip + res.storiesCount);
            setHasMore(res.moreData);
        })
    }

    useEffect(() => {
        setSkip(0);
        setHasMore(true);
        setDetails([]);
        setNewId(true);
    }, [type, value])

    useEffect(() => {
        if (newId === true) {
            setNewId(false);
            fetchMoreData();
        }
    }, [newId])

    return <>
        {/*<svg width={0} height={0}>
            <linearGradient id="linearColors" x1="50%" y1="0" x2="0%" y2="100%">
                <stop offset="26.76%" stopColor="#FFFFFF"/>
                <stop offset="85.79%" stopColor="#BBBBBB" />
            </linearGradient>
        </svg>*/}
        <InfiniteScroll
          dataLength={details.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <Box className="h-[64px] flex">
                <Box className="m-auto">
                    <CircularProgress />
                </Box>
            </Box>
          }
          endMessage={
            type === "SINGLE" ? "" :
            <PrimaryText className="text-center">
                No More Fables Found
            </PrimaryText>
          }
        >
        {
            details.map((item, i) => {
                return <FableItem key={i} item={item} />
            })
        }
        </InfiniteScroll>
    </>;
}