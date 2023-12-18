
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import DialogContext from '../contexts/dialogContext';

import CloseIcon from '@mui/icons-material/Close';

import Download from './Modals/Download';
import Login from './Modals/Login';
import ShareYourFable from './Modals/ShareYourFable';
import AddVoiceSample from './Modals/AddVoiceSample';
import EditProfile from './Modals/EditProfile';
import Playing from './Modals/Playing';
import Share from './Modals/Share';
import PostComment from './Modals/PostComment';

import { _playFable } from '../apis';

export default function MenuProvider(props) {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const action = snackbarId => (
		<IconButton onClick={() => closeSnackbar(snackbarId)} sx={{color: 'inherit'}}>
			<CloseIcon />
		</IconButton>
	);

	const showToast = (message) => {
		enqueueSnackbar(message, {
			action,
			autoHideDuration: 6000,
		});
	}

	const showWarning = (message) => {
		enqueueSnackbar(message, {
			variant: 'warning',
			action,
			autoHideDuration: 6000,
		});
	}

	const showError = (message) => {
		enqueueSnackbar(message, {
			variant: 'error',
			action,
			autoHideDuration: 6000,
		});
	}

	const [download, setDownload] = useState(false);

	const [login, setLogin] = useState(false);

	const [share, setShare] = useState(false);
	const [shareTitle, setShareTitle] = useState("");
	const [shareUrl, setShareUrl] = useState("");

	const [shareYourFable, setShareYourFable] = useState(false);
	const [fableTitle, setFableTitle] = useState("");

	const [postComment, setPostComment] = useState(false);
	const [postCommentId, setPostCommentId] = useState("");
	const [postCommentCb, setPostCommentCb] = useState(null);

	const [addVoiceSample, setAddVoiceSample] = useState(false);

	const [editProfile, setEditProfile] = useState(false);
	const [editProfileDetails, setEditProfileDetails] = useState(null);
	const [editProfileCb, setEditProfileCb] = useState(null);

	const [playing, setPlaying] = useState(false);
	const [playingFable, setPlayingFable] = useState(null);
	const [playingStatus, setPlayingStatus] = useState(false);

    const showDownload = () => {
		setDownload(true);
    }

	const showLogin = () => {
		setLogin(true);
    }

	const showShareYourFable = (title) => {
		setFableTitle(title);
		setShareYourFable(true);
	}

	const showPostComment = (id, cb) => {
		setPostCommentId(id);
		setPostCommentCb(() => cb);
		setPostComment(true);
	}

	const showAddVoiceSample = () => {
		setAddVoiceSample(true);
	}

	const showEditProfile = (details, cb) => {
		setEditProfile(true);
		setEditProfileDetails(details);
		setEditProfileCb(() => cb);
	}

	const showShare = (title, url) => {
		setShare(true);
		setShareTitle(title);
		setShareUrl(url);
	}

	const setPlayingHandler = (fable, playing) => {
		if (playingFable === null || playingFable.id !== fable.id) {
			_playFable(fable.id);
		}

		setPlaying(true);
		setPlayingFable(fable);
		setPlayingStatus(playing)
	}

	const playVoiceSample = (author, title, photo, audioFile) => {
		setPlaying(true);
		setPlayingFable({
			id: "",
			author,
			title,
			photo,
			audioFile
		});
		setPlayingStatus(true)
	}

	let context = {
		showDownload,
		showLogin,
		showShareYourFable,
		showAddVoiceSample,
		showPostComment,
		showEditProfile,
		showShare,
		showToast,
		showError,
		showWarning,
		setPlaying: setPlayingHandler,
		playVoiceSample,
		playingFable,
		setPlayingFable,
		playingStatus,
		setPlayingStatus
	};

	return (
		<DialogContext.Provider value={context}>
			{props.children}
			{
				download === false ? "" :
				<Download show={download} setShow={setDownload} />
			}
			{
				login === false ? "" :
				<Login show={login} setShow={setLogin} />
			}
			{
				shareYourFable === false ? "" :
				<ShareYourFable t={fableTitle} show={shareYourFable} setShow={setShareYourFable} />
			}
			{
				addVoiceSample === false ? "" :
				<AddVoiceSample show={addVoiceSample} setShow={setAddVoiceSample} />
			}
			{
				postComment === false ? "" :
				<PostComment show={postComment} setShow={setPostComment} id={postCommentId} cb={postCommentCb} />
			}
			{
				editProfile === false ? "" :
				<EditProfile show={editProfile} setShow={setEditProfile} details={editProfileDetails} cb={editProfileCb} />
			}
			{
				playing === false ? "" :
				<Playing show={playing} setShow={setPlaying} details={playingFable} />
			}
			{
				share === false ? "" :
				<Share show={share} setShow={setShare} title={shareTitle} url={shareUrl} />
			}
		</DialogContext.Provider>
	);
};