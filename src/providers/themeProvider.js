
import { useState } from 'react';
import ThemeContext from '../contexts/themeContext';
import { ThemeProvider as BasicThemeProvider } from 'styled-components'

const lightTheme = {
    primaryColor: "#262259",
    secondaryColor: "#706D8B",
    textColor: "#FBFAFD",
    whiteColor: "#EEEDF0",
    highlightColor: "#6D61FD",
    darkColor: "#262259",
    topicColor: "#383559",
    inputTextColor: "#6D6D6D",
    inputBgColor: "#EEEDF0",
    navigationBgColor: "#EEEDF0",
    bgColor: "#FBFAFD",
  };

const darkTheme = {
    primaryColor: "#EEEDF0",
    secondaryColor: "#706D8B",
    textColor: "#FBFAFD",
    whiteColor: "#EEEDF0",
    highlightColor: "#6D61FD",
    darkColor: "#262259",
    topicColor: "#383559",
    inputTextColor: "#706D8B",
    inputBgColor: "#232045",
    navigationBgColor: "#232045",
    bgColor: "#12102C",
  };

const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
export default function ThemeProvider(props) {
	const [theme, setTheme] = useState(getCurrentTheme() ? 'dark' : 'light');

  const switchTheme = () => {
      if (isDark())
          setTheme('light');
      else
          setTheme('dark');
  }

  const isDark = () => {
    return theme === 'dark';
  }

  const currentTheme = () => {
    if (isDark())
          return darkTheme;
      else
          return lightTheme;
  }

	let context = {
		theme: theme,
		switchTheme: switchTheme,
    isDark: isDark,
    currentTheme: currentTheme,
	};

	return (
		<ThemeContext.Provider value={context}>
      <BasicThemeProvider theme={currentTheme()}>
        {props.children}
      </BasicThemeProvider>
		</ThemeContext.Provider>
	);
};