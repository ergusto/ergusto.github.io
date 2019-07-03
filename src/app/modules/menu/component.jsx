import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './style.scss';

export default function menu() {
	const dropdown = useRef(null),
		button = useRef(null);

	const [showMenu, setShowMenu] = useState(false),
		[menuHover, setMenuHover] = useState(false);

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
			console.log('No dropdown.current');
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
		document.body.addEventListener('click', onBodyClick);
	};

	const removeBodyListener = () => {
		document.body.removeEventListener('click', onBodyClick);
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

	let menuClass = "menu box-shadow-large background-color-blue";

	if (showMenu) {
		menuClass += " menu--open";
	}

	if(menuHover) {
		menuClass += " menu--hovered";
	}

	return (
		<div className={menuClass} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
			<div ref={button} onClick={toggleMenu} id="dropDown" className="menu-button cursor-pointer border-bottom-radius background-color-blue">
				<span className="color-white"><FontAwesomeIcon icon='bars' /></span>
			</div>

			<div ref={dropdown} className="menu-box padding-all font-family-raleway color-white">
				<h1 className="font-family-comfortaa inline-block font-size-bigger line-height-site-title margin-right-2 margin-left">ergusto</h1>
				<ul className="inline-block float-right">
					<li className="inline-block margin-right"><Link className="color-white no-decoration font-weight-semi-bold line-height-site-title" to="/">Intro</Link></li>
					<li className="inline-block margin-right"><Link className="color-white no-decoration font-weight-semi-bold line-height-site-title" to="/calendar">Calendar</Link></li>
					<li className="inline-block margin-right"><Link className="color-white no-decoration font-weight-semi-bold line-height-site-title" to="/comments">Comments</Link></li>
				</ul>
			</div>
		</div>
	);

}