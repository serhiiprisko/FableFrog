
import { useContext } from 'react';

import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { FableMenu } from '../../Components';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AuthContext from '../../contexts/authContext';
import DialogContext from '../../contexts/dialogContext';
import { _deleteFable, _report } from '../../apis';

import axios from 'axios';
import fileDownload from 'js-file-download';

export default function MoreMenu({pos, show, item, setShow, refreshCb}) {
    const authCtx = useContext(AuthContext);
    const dialogCtx = useContext(DialogContext);

    const handleClose = (e) => {
        setShow(false);
        e.preventDefault();
    };

    const handleShare = () => {
        dialogCtx.showShare(item.title, `${window.location.origin}/#/fable/${item.id}`);
        setShow(false);
    }

    const handleDownload = () => {
        const ext = item.audioFile.split(".").pop();

        axios.get(item.audioFile, {
            responseType: 'blob',
          })
          .then((res) => {
            fileDownload(res.data, item.title + "." + ext)
          })
          
        setShow(false);
    }

    const handleReport = () => {
        _report(authCtx.getUserId(), item.id)
        .then((res) => {
            if (res.success === 1) {
                dialogCtx.showToast(res.message);
                refreshCb();
            }
            else
                dialogCtx.showError(res.message);
        })
        .catch((e) => {
            dialogCtx.showError(e.message);
        })
        
        setShow(false);
    }

    const handleDelete = () => {
        setShow(false);
        _deleteFable(
            authCtx.getUserId(),
            item.id,
        )
        .then((res) => {
            if (res.success === 1) {
                dialogCtx.showToast(res.message);
                authCtx.goToProfile();
            }
            else
                dialogCtx.showError(res.message);
        })
        .catch((e) => {
            dialogCtx.showError(e.message);
        })
    }

    return <FableMenu
        anchorReference="anchorPosition"
        anchorPosition={pos}
        open={show}
        onClose={handleClose}
    >
        <MenuItem onClick={handleShare}>
            <ListItemIcon>
                <ShareIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Share</ListItemText>
        </MenuItem>
        {/*authCtx.getUserId() === item.authorId && (
            <MenuItem>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
            </MenuItem>
        )*/}
        {authCtx.getUserId() !== item.authorId && (
            <MenuItem onClick={handleReport}>
                <ListItemIcon>
                    <InfoOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{item.isReportedByMe === false ? "Report" : "Unreport"}</ListItemText>
            </MenuItem>
        )}
        <MenuItem onClick={handleDownload}>
            <ListItemIcon>
                <DownloadIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Download</ListItemText>
        </MenuItem>
        {authCtx.getUserId() === item.authorId && (
            <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                    <DeleteOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
            </MenuItem>
        )}
    </FableMenu>
}