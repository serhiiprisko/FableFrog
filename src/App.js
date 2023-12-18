import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

import { Box } from "@mui/material";

import ThemeProvider from "./providers/themeProvider";
import DialogProvider from "./providers/dialogProvider";
import AuthProvider from "./providers/authProvider";
import MenuProvider from "./providers/menuProvider";
import AudioProvider from "./providers/audioProvider";
import { SnackbarProvider } from "notistack";

import Home from "./Pages/Home";
import Topics from "./Pages/Topics";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import RecentUserActivity from "./Pages/RecentUserActivity";
import Suggestions from "./Pages/Suggestions";
import Fable from "./Pages/Fable";
import Topic from "./Pages/Topic";
import CopyrightPolicy from "./Pages/CopyrightPolicy";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions";

const AppBg = styled(Box)`
  background: ${(props) => props.theme.bgColor};
`;

export default function App() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 3;
  unlockAudioContext(audioCtx);

  function unlockAudioContext(audioCtx) {
    if (audioCtx.state !== "suspended") return;
    const b = document.body;
    const events = ["touchstart", "touchend", "mousedown", "keydown"];
    events.forEach((e) => b.addEventListener(e, unlock, false));
    function unlock() {
      audioCtx.resume().then(clean);
    }
    function clean() {
      events.forEach((e) => b.removeEventListener(e, unlock));
    }
  }

  return (
    <AuthProvider>
      <AudioProvider {...{ audioCtx, gainNode }}>
        <ThemeProvider>
          <SnackbarProvider maxSnack={3}>
            <DialogProvider>
              <MenuProvider>
                <HashRouter>
                  <AppBg
                    className="min-h-screen flex px-4 py-10 xl:px-10 xl:py-4"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <Routes>
                      <Route path="home" exact element={<Home />} />
                      <Route path="topics" exact element={<Topics />} />
                      <Route path="contact" exact element={<Contact />} />
                      <Route path="profile/:id" exact element={<Profile />} />
                      <Route path="fable/:id" exact element={<Fable />} />
                      <Route path="topic/:id" exact element={<Topic />} />
                      <Route
                        path="suggestions"
                        exact
                        element={<Suggestions />}
                      />
                      <Route
                        path="recent-user-activity"
                        exact
                        element={<RecentUserActivity />}
                      />
                      <Route
                        path="copyright"
                        exact
                        element={<CopyrightPolicy />}
                      />
                      <Route path="privacy" exact element={<PrivacyPolicy />} />
                      <Route
                        path="terms-and-conditions"
                        exact
                        element={<TermsAndConditions />}
                      />

                      <Route path="/" element={<Navigate to="/home" />} />
                    </Routes>
                  </AppBg>
                </HashRouter>
              </MenuProvider>
            </DialogProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </AudioProvider>
    </AuthProvider>
  );
}
