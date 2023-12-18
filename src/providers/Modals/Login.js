
import { useState, useContext } from 'react';

import { Box, OutlinedInput, CircularProgress } from '@mui/material';
import { FableDialog, FableButton, FablePhoneNumber, PrimaryTextLarge, SecondaryText, PrimaryText } from '../../Components';

import MessageIcon from '@mui/icons-material/Message';
import GoogleIcon from '@mui/icons-material/Google';

import ThemeContext from '../../contexts/themeContext';
import AuthContext from '../../contexts/authContext';
import DialogContext from '../../contexts/dialogContext';

import parsePhoneNumber from 'libphonenumber-js';
import { _signInWithGoogle, _signInWithPhone } from '../../apis';
import firebase from '../../services/firebase';

const getPhoneNumber = (phone) => {
	if (phone[0] !== '+') phone = '+' + phone;
	const phoneNumber = parsePhoneNumber(phone);
	if (phoneNumber === undefined || phoneNumber.number === "")
		return "";
	if (phoneNumber.isValid() === false)
		return "";
	return phoneNumber.countryCallingCode + phoneNumber.nationalNumber;
}

export default function Login({show, setShow}) {
    const authCtx = useContext(AuthContext);
    const dialogCtx = useContext(DialogContext);
    const themeCtx = useContext(ThemeContext);
    const theme = themeCtx.currentTheme();

    const [step, setStep] = useState(0);
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState("");

    const handleClose = () => {
        setShow(false);
    };

    const renderLoginButton = () => {
        const signInWithGoogle = () => {
            let provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });

            if (false) {
                setLoading(true);
                _signInWithGoogle({
                    email: "denis.turgenev2021@gmail.com",
                    uid: "rIb1ftKhiohDZFjRMUd62xnamFF3",
                    displayName: "Denis Turgenev",
                    photoURL: "https://lh3.googleusercontent.com/a/AEdFTp7ysihv_zgQcASh6kYAVGGJYxPCUg45FMbqvwPD=s96-c"
                })
                .then((res) => {
                    if (res.success === 1)
                        authCtx.setUserId(res.userId);
                    setLoading(false);
                    setShow(false);
                })
                .catch((e) => {

                })
                return;
            }
            
            setLoading(true);
            firebase.auth().signInWithPopup(provider)
            .then(result => {
                _signInWithGoogle(result.user)
                .then((res) => {
                    if (res.success === 1)
                        authCtx.setUserId(res.userId);
                    setLoading(false);
                    setShow(false);
                })
                .catch((e) => {
                    dialogCtx.showError(e.message);
                    setLoading(false);
                })
            })
            .catch(function(error) {
                dialogCtx.showError(error.code + " " + error.message);
                setLoading(false);
            });
        }

        const signInWithPhoneNumber = () => {
            setStep(1);
        }
        
        return <Box className="max-w-[224px] mx-auto">
            <FableButton className="!w-full flex mb-2" onClick={signInWithPhoneNumber}>
                <p>Login with a phone</p>
                <span className="ml-auto" />
                <MessageIcon />
            </FableButton>
            <FableButton className="!w-full flex" onClick={signInWithGoogle}>
                <p>Login with Google</p>
                <span className="ml-auto" />
                <GoogleIcon />
            </FableButton>
        </Box>
    }
    
    const renderLoginSendOTP = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: function(response) {
                    signWithPhoneNumber();
                }
            }
        );

        const signWithPhoneNumber = () => {
            setLoading(true);
            firebase.auth().signInWithPhoneNumber("+" + getPhoneNumber(phone), window.recaptchaVerifier)
            .then(function(confirmationResult) {
                window.confirmationResult = confirmationResult;
                setStep(2);
                setLoading(false);
            })
            .catch(function(error) {
                if (error.code !== undefined)
                    dialogCtx.showError(error.code + " " + error.message);
                setLoading(false);
            });
        }

        return <Box className="grid max-w-[320px] mx-auto" gridTemplateColumns={"1fr auto"}>
            <FablePhoneNumber
                value={phone}
                onChange={(e) => setPhone(e)} />
            <FableButton className="flex flex-col justify-center !rounded-l-none" onClick={signWithPhoneNumber}>
                Send OTP
            </FableButton>
        </Box>
    }
    
    const renderLoginVerify = () => {
        const verifyCode = () => {
            setLoading(true);
            window.confirmationResult.confirm(code)
            .then(function(result) {
                _signInWithPhone(result.user)
                .then((res) => {
                    if (res.success === 1)
                        authCtx.setUserId(res.userId);
                    setLoading(false);
                    setShow(false);
                })
                .catch((e) => {
                    dialogCtx.showError(e.message);
                    setLoading(false);
                })
            })
            .catch(function(error) {
                dialogCtx.showError(error.code + " " + error.message);
                setLoading(false);
            });
        }

        return <Box className="grid max-w-[320px] mx-auto" gridTemplateColumns={"1fr auto"}>
            <FablePhoneNumber 
                value={phone}
                disabled />
            <FableButton className="flex flex-col justify-center !rounded-l-none !w-full">
                Send OTP
            </FableButton>
            <Box className="pb-4" />
            <Box className="pb-4" />
            <OutlinedInput
                fullWidth
                placeholder="Enter the 6 digits code..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "10px 0 0 10px",
                        borderColor: `${theme.primaryColor}40 !important`,
                        borderRight: `0 !important`,
                    },
                    "& .MuiInputBase-input": {
                        color: theme.primaryColor
                    },
                }}
                />
            <FableButton className="flex flex-col justify-center !rounded-l-none !w-full"
                onClick={() => verifyCode()}>
                Verify
            </FableButton>
        </Box>
    }

    const renderContent = () => {
        if (step === 0)
            return renderLoginButton();
        else if (step === 1)
            return renderLoginSendOTP();
        else if (step === 2)
            return renderLoginVerify();
    }

    return <FableDialog
        open={show}
        onClose={handleClose}
        >
        <Box className="px-4 xl:px-10 py-6">
            <Box className="flex justify-center pb-2">
                <img className="min-w-[24px]" src="./logo.svg" alt="logo" />
            </Box>
            {
                step === 0 ?
                <PrimaryTextLarge className="pb-12 text-center">
                    Login and start sharing Fables today!
                </PrimaryTextLarge>
                :
                <PrimaryText className="pb-12">
                    In order to login from phone, you must verify your phone number with a verification code.
                </PrimaryText>
            }
            { renderContent() }
            <div id="recaptcha-container" className="hidden"></div>
            <SecondaryText className="pt-6 text-center">
                You agree to our Terms & Conditions.
            </SecondaryText>
        </Box>
        {
            loading ?
            <Box className="w-full h-full absolute flex">
                <Box className="m-auto">
                    <CircularProgress />
                </Box>
            </Box>
            : ""
        }
    </FableDialog>
}