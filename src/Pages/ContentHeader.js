
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, useMediaQuery } from "@mui/material";
import { FableInput, FableButton, FableItemBg, InputText, FableSearchItem, PrimaryTextWithMobile } from "../Components";

import MicIcon from '@mui/icons-material/Mic';

import AuthContext from "../contexts/authContext";
import DialogContext from "../contexts/dialogContext";

import { _search } from "../apis";

export default function ContentHeader() {
    const isDesktop = useMediaQuery('(min-width:1280px)');
    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);
    const dialogCtx = useContext(DialogContext);

    const [query, setQuery] = useState("");
    const [details, setDetails] = useState(null);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setQuery(query);
    }

    const handleLostFocus = (e) => {
        setTimeout(() => {
            setQuery("");
        }, 100);
    }

    useEffect(() => {
        if (query.length > 2) {
            setDetails(null);
            _search(authCtx.getUserId(), query)
            .then((res) => {
                setDetails(res.items);
            })
        }
    }, [query]);

    const renderItem = (item, i) => {
        if (item.type === "user") {
            return <Box className="break-all grid gap-[4px] cursor-pointer" key={i} gridTemplateColumns={"auto 1fr auto"} onClick={() => navigate(`/profile/${item.id}`)}>
                <Box className="my-auto mr-2 w-[42px] h-[42px] bg-center bg-cover rounded-[99px] bg-[#00000020]" style={{backgroundImage: `url(${item.avatar}`}} />
                <PrimaryTextWithMobile className="mr-auto flex flex-col justify-center">{item.username}</PrimaryTextWithMobile>
                <FableButton className="h-fit my-auto">View Profile</FableButton>
            </Box>
        }
        else {
            return <Box className="break-all" key={i}>
                <FableSearchItem item={item}></FableSearchItem>
            </Box>
        }
    }

    const renderSearch = () => {
        if (authCtx.isLogin() === true) {
            return <FableButton className="ml-4" onClick={() => dialogCtx.showShareYourFable("")}>
                {isDesktop ? "Share your Fable" : "Record"}
                <span className="pr-3" />
                <MicIcon />
            </FableButton>
        }
        else {
            if (isDesktop)
                return <Box />
            else {
                return <FableButton className="ml-4" onClick={() => dialogCtx.showLogin("")}>
                    Sign In
                </FableButton>
            }
        }
    }

    const renderResult = () => {
        if (query === "")
            return "";
        else
            return <FableItemBg className="rounded-t-[10px] xl:rounded-t-0 rounded-b-[10px] relative top-[12px] xl:top-[-12px] z-10">
                {
                    query.length < 3 ? <InputText className="p-4">{`Please enter ${3 - query.length} or more characters`}</InputText> :
                    details === null ? <InputText className="p-4">Searching...</InputText> :
                    <Box className="p-4 grid gap-4 max-h-[90vh] overflow-auto">
                    {
                        details.map((item, i) => {
                            return renderItem(item, i)
                        })
                    }
                    </Box>
                }
            </FableItemBg>
    }

    const renderInput = () => {
        return <FableInput
            className="z-[20]"
            style={{
                borderBottomLeftRadius: isDesktop && query !== "" ? 0 : "10px",
                borderBottomRightRadius: isDesktop && query !== "" ? 0 : "10px"
            }}
            placeholder="Search for Fables, tags or users..."
            value={query}
            onChange={handleSearchChange}
            onBlur={handleLostFocus}
        />
    }

    return isDesktop ? 
        <Box className="grid h-[42px]" gridTemplateColumns={"1fr auto"}>
            { renderInput() }
            { renderSearch() }
            { renderResult() }
        </Box>
        :
        <Box className="h-[42px]">
            <Box className="grid h-[42px]" gridTemplateColumns={"1fr auto"}>
                { renderInput() }
                { renderSearch() }
            </Box>
            { renderResult() }
        </Box>
}