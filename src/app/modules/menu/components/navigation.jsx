import React from 'react';
import { motion } from 'framer-motion';
import MenuItem from './menu-item.jsx';

const variants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 }
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 }
	}
};

export default function Navigation() {
	return (
		<motion.ul className='menu-nav' variants={variants}>
			<MenuItem text='Introduction' url='/' />
			<MenuItem text='Calendar' url='/calendar' />
			<MenuItem text='Comments' url='/comments' />
		</motion.ul>
	);
}
