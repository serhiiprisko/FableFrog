
import { useState } from 'react';
import MenuContext from '../contexts/menuContext';

import MoreMenu from './Menus/MoreMenu';
import MobileSetting from './Menus/MobileSetting';

export default function MenuProvider(props) {
    const [moreMenuPos, setMoreMenuPos] = useState({ top: 0, left: 0 });
	const [moreItem, setMoreItem] = useState({});
	const [moreMenu, setMoreMenu] = useState(false);
	const [moreRefreshCb, setMoreRefreshCb] = useState(null);

	const [mobileSettingPos, setMobileSettingPos] = useState({ top: 0, left: 0 });
	const [mobileSetting, setMobileSetting] = useState(false);
	
	const showMoreMenu = (item, refreshCb, e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setMoreMenuPos({top: rect.bottom, left: rect.right});
		setMoreItem(item);
		setMoreMenu(true);
		setMoreRefreshCb(() => refreshCb);

        e.preventDefault();
		e.stopPropagation();
	}

	const showMobileSetting = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setMobileSettingPos({top: rect.bottom, left: rect.right});
		setMobileSetting(true);

		e.preventDefault();
		e.stopPropagation();
	}

	let context = {
		showMoreMenu,
		showMobileSetting,
	};

	return (
		<MenuContext.Provider value={context}>
			{props.children}
			{moreMenu && <MoreMenu pos={moreMenuPos} show={moreMenu} item={moreItem} setShow={setMoreMenu} refreshCb={moreRefreshCb} />}
			{mobileSetting && <MobileSetting pos={mobileSettingPos} show={mobileSetting} setShow={setMobileSetting} />}
		</MenuContext.Provider>
	);
};