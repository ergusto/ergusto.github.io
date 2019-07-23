import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMedia } from 'use-media';
import './style.scss';

const clickEventType = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';

export default function Menu() {
	const dropdown = useRef(null),
		button = useRef(null);

	const [showMenu, setShowMenu] = useState(false),
		[menuHover, setMenuHover] = useState(false);

	const isMobile = useMedia({ maxWidth: 375 });

	const open = () => setShowMenu(true);
	const close = () => {
		setShowMenu(false);
		setMenuHover(false);
	};

	const toggleMenu = event => {
		if(event) event.preventDefault();

		if(showMenu) {
			close();
		} else {
			open();
		}
	};

	const onBodyClick = event => {
		if(!dropdown.current) {
			return;
		}

		if (!dropdown.current.contains(event.target) && !button.current.contains(event.target)) {
			close();
		}
	};

	const onMouseOver = () => {
		setMenuHover(true);
	};

	const onMouseOut = () => {
		setMenuHover(false);
	};

	const addBodyListener = () => {
		document.body.addEventListener(clickEventType, onBodyClick);
	};

	const removeBodyListener = () => {
		document.body.removeEventListener(clickEventType, onBodyClick);
	};

	useEffect(() => {
		if(showMenu) {
			addBodyListener();
		} else {
			removeBodyListener();
		}
	}, [showMenu]);

	// Remove body listener on unmount
	useEffect(() => {
		return () => {
			removeBodyListener();
		}
	}, []);

	let menuClass = "site-menu background-color-blue box-shadow";

	if (showMenu) {
		menuClass += " site-menu--open";
	}

	if(menuHover) {
		menuClass += " site-menu--hovered";
	}

	const listClass = isMobile ? 'block padding-left padding-top' : 'inline-block float-right';
	const itemClass = isMobile ? 'block' : 'inline-block margin-right';

	return (
		<div className={menuClass} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
			<div ref={button} onClick={toggleMenu} id="dropDown" className="site-menu-button cursor-pointer border-bottom-radius background-color-blue">
				<span className="color-white"><FontAwesomeIcon icon='bars' /></span>
			</div>

			<div ref={dropdown} className="site-menu-box padding-all font-family-raleway color-white">
				<h1 className="font-family-comfortaa inline-block font-size-bigger line-height-site-title margin-right-2 margin-left">ergusto</h1>
				<ul className={listClass}>
					<li className={itemClass}><Link className="color-white no-decoration font-weight-semi-bold line-height-site-title" to="/">Intro</Link></li>
					<li className={itemClass}><Link className="color-white no-decoration font-weight-semi-bold line-height-site-title" to="/calendar">Calendar</Link></li>
					<li className={itemClass}><Link className="color-white no-decoration font-weight-semi-bold line-height-site-title" to="/comments">Comments</Link></li>
				</ul>
			</div>
		</div>
	);

}