import React, { useState, useEffect, useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useReactRouter from 'use-react-router';
import { useDimensions } from '../../../lib';
import MenuToggle from './menu-toggle.jsx';
import Navigation from './navigation.jsx';

import './style.scss';

const headerVariants = {
	open: (height = 1000) => ({
		height: `${height * 2 + 100}px`,
		width: '250px',
		left: 0,
		top: 0,
		borderRadius: ['20%', '15%', '10%', '5%', '0%'],
		transition: {
			type: 'spring',
			stiffness: 20,
			restDelta: 2
		}
	}),
	closed: {
		top: '20px',
		left: '20px',
		height: '40px',
		width: '40px',
		borderRadius: '25px',
		transition: {
			delay: 0.5,
			type: 'spring',
			stiffness: 400,
			damping: 40
		}
	}
};

const Menu = () => {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const headerRef = useRef(null);
	const { height } = useDimensions(headerRef);

	const documentClick = event => {
		if(headerRef.current && !headerRef.current.contains(event.target)) {
			document.removeEventListener('click', documentClick);
			toggleOpen();
		}
	};

	const toggleMenu = event => {
		if(isOpen) {
			toggleOpen();
		} else {
			document.addEventListener('click', documentClick);
			toggleOpen();			
		}
	};

	return (
		<motion.header className='menu-header z-index-1 absolute left bottom right top' initial={false} animate={isOpen ? 'open' : 'closed'} custom={height} ref={headerRef}>
			<motion.div className='menu-background absolute left bottom right top background-color-blue' variants={headerVariants} />
			<Navigation />
			<MenuToggle toggle={toggleMenu} />
		</motion.header>
	);
}

export default function() {
	const { location } = useReactRouter();

	const isIntroduction = location.pathname === '/';

	return (
		<React.Fragment>
			{isIntroduction ? null : <Menu />}
		</React.Fragment>
	);
}