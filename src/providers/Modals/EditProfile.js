
import { useState } from 'react';

import { Box } from '@mui/material';
import { FableButton, FableDialog, PrimaryTextLarge, FableContactInput } from '../../Components';
import { _updateProfile } from '../../apis';

export default function EditProfile({show, setShow, details, cb}) {
    const [fableName, setFableName] = useState(details?.username);
    const [bio, setBio] = useState(details?.userBio);
    const [FBName, setFBName] = useState(details?.fbLink);
    const [twitterName, setTwitterName] = useState(details?.twitterLink);
    const [instName, setInstName] = useState(details?.instaLink);
    const [LIName, setLIName] = useState(details?.linkedinLink);

    const handleClose = () => {
        setShow(false);
    };

    const handleSaveChanges = () => {
        _updateProfile(details.id, fableName, bio, FBName, twitterName, instName, LIName)
        .then((res) => {
            if (res.success === 1)
                cb();
        })
        handleClose();
    }
    
    return <FableDialog
        open={show}
        onClose={handleClose}
        >
        <Box className="p-6 grid gap-4">
            <PrimaryTextLarge className="text-center">
                Edit Profile
            </PrimaryTextLarge>
            <FableContactInput size="small"
                placeholder="Enter Fabler Name"
                value={fableName}
                onChange={(e) => setFableName(e.target.value)}
            />
            <FableContactInput size="small"
                multiline
                rows={4}
                placeholder="Enter Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />
            <FableContactInput size="small"
                placeholder="Facebook Username"
                value={FBName}
                onChange={(e) => setFBName(e.target.value)}
            />
            <FableContactInput size="small"
                placeholder="Twitter Username"
                value={twitterName}
                onChange={(e) => setTwitterName(e.target.value)}
            />
            <FableContactInput size="small"
                placeholder="Instagram Username"
                value={instName}
                onChange={(e) => setInstName(e.target.value)}
            />
            <FableContactInput size="small"
                placeholder="LinkedIn Username"
                value={LIName}
                onChange={(e) => setLIName(e.target.value)}
            />
            <FableButton onClick={handleSaveChanges} className="!w-full text-center">
                Save Changes
            </FableButton>
        </Box>
    </FableDialog>
}