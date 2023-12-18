
import { useState } from 'react';
import AuthContext from '../contexts/authContext';

import { _logout } from '../apis';

export default function AuthProvider(props) {
	const [userId, setUserId] = useState(localStorage.getItem("FABLEFROG_USER"));

	const setUserIdHandler = (userId) => {
		localStorage.setItem("FABLEFROG_USER", userId);
		setUserId(userId);
		window.location.reload();
	}

	const isLogin = () => {
		if (userId === null || userId === "" || userId === "undefined" || userId === undefined)
            return false;
		return true;
	}

	const getUserId = () => {
		if (isLogin())
			return userId;
		return "";
	}

	const logout = () => {
		_logout()
		.then((res) => {
			localStorage.removeItem("FABLEFROG_USER");
			setUserId("");
			window.location.reload();
		})
	}

	const goToProfile = () => {
		window.location.href = `/#/profile/${getUserId()}`;
		window.location.reload();
	}

	let context = {
		userId,
		setUserId: setUserIdHandler,
		getUserId,
		isLogin,
		logout,
		goToProfile,
	};

	return (
		<AuthContext.Provider value={context}>
			{props.children}
		</AuthContext.Provider>
	);
};