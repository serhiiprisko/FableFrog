
import { Box } from '@mui/material';
import { FableDialog, PrimaryTextLarge, SecondaryText } from '../../Components';

function MobileStoreButton({store, url}) {
    return <img className="cursor-pointer" src={`/${store}-icon.png`} alt={store} onClick={() => window.open(url)} />
}

export default function Download({show, setShow}) {

    const handleClose = () => {
        setShow(false);
    };
    
    return <FableDialog
        open={show}
        onClose={handleClose}
        >
        <Box className="p-6">
            <Box className="flex justify-center pb-2">
                <img className="min-w-[24px]" src="./logo.svg" alt="logo" />
            </Box>
            <PrimaryTextLarge className="pb-2 text-center">
                Download FableFrog on your SmartPhone
            </PrimaryTextLarge>
            <SecondaryText className="pb-8 text-center">
                Download the app for iOS or Android
            </SecondaryText>
            <Box className="w-[192px] mx-auto">
                <MobileStoreButton
                    store="android"
                    url="https://play.google.com/store/apps/details?id=fablefrog.app"
                />
                <Box className="pb-2" />
                <MobileStoreButton
                    store="ios"
                    url="https://apps.apple.com/jm/app/fablefrog/id1568989824"
                />
            </Box>
        </Box>
    </FableDialog>
}