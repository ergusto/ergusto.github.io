import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import './menu-item.scss';

const variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 }
		}
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 }
		}
	}
};

export default function MenuItem({ text, url }) {
	return (
		<motion.li variants={variants} whileHover={{ scale: 1.035 }}>
			<Link to={url} className='menu-item-link color-white font-family-comfortaa no-underline font-weight-medium margin-bottom block'>{text}</Link>
		</motion.li>
	);
}
