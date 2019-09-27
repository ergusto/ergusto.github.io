import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MainMenu from './menu.jsx';
import './style.scss';

export default function MenuTrigger() {
	const [showMenu, setShowMenu] = useState(false);

	const open = () => setShowMenu(true);
	const close = () => setShowMenu(false);

	const toggleMenu = event => {
		if(event) event.preventDefault();

		showMenu ? close() : open();
	};

	return (
		<>
			<button onClick={toggleMenu} className='site-menu-trigger cursor-pointer background-color-blue outline-none color-white'>
				<FontAwesomeIcon icon='bars' />
			</button>

			<MainMenu showMenu={showMenu} closeMenu={close} toggleMenu={toggleMenu} />
		</>
	);

}