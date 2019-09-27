import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import posed, { PoseGroup } from 'react-pose';

const frozenClass = 'overflow-hidden';

const freezeBody = () => document.body.classList.add(frozenClass),
	unfreezeBody = () => document.body.classList.remove(frozenClass);

const Container = posed.div({
	enter: {
		opacity: 1,
		beforeChildren: true,
		staggerChildren: 50
	},
	exit: { opacity: 0 }
});

const SiteHeading = posed.h1({
	enter: { x: 0, opacity: 1 },
	exit: { x: -100, opacity: 0 }
});

const ListItem = posed.li({
	enter: { x: 0, opacity: 1 },
	exit: { x: -50, opacity: 0 }
});

const IntroParagraph = posed.p({
	enter: { x: 0, opacity: 1 },
	exit: { x: -50, opacity: 0 }
});

const MenuLink = withRouter(({ to, closeMenu, match, location, history, children }) => {
	const className = 'site-menu-list-link color-white no-decoration line-height-site-title font-size-copy font-weight-thin',
		onClick = () => {
			closeMenu();
			history.push(to);
		};

	return (
		<button onClick={onClick} className={className}>
			{children}
		</button>
	);
});

export default function Menu({ toggleMenu, closeMenu, showMenu, isHovered }) {
	const listClass = 'site-menu-list margin-top-2 padding-top',
		itemClass = 'site-menu-list-item margin-bottom-2',
		introClass = 'margin-top-2 padding-top font-size-copy';

	let menuClass = 'site-menu overflow-hidden background-color-blue box-shadow color-white font-family-raleway padding-all-2';

	if(showMenu) menuClass += ' site-menu--open';
	if(isHovered) menuClass += ' site-menu--hovered';

	// Add frozen class to body on mount
	useEffect(() => {
		freezeBody();	

		return () => unfreezeBody();
	}, []);

	return (
		<PoseGroup flipMove={false}>
			{showMenu && (
				<Container key='menu-container' className={menuClass} style={{ zIndex: 100 }}>
					<header className='clearfix'>
						<SiteHeading className='site-menu-heading font-family-comfortaa margin-right-2 margin-top-small float-left'>ergusto</SiteHeading>
						<button onClick={toggleMenu} className='site-menu-close background-color-white color-blue no-decoration'>
							<FontAwesomeIcon icon='times' />
						</button>
					</header>
					<div className='block clearfix'>
						<div className='site-menu-introduction'>
							<IntroParagraph className={introClass}>
								{`Hi there. My name's Fergus Ruston. I'm a programmer living in London.`}
							</IntroParagraph>
						</div>
						<ul className={listClass}>
							<ListItem className={itemClass}><MenuLink closeMenu={closeMenu} to='/'>Intro</MenuLink></ListItem>
							<ListItem className={itemClass}><MenuLink closeMenu={closeMenu} to='/calendar'>Calendar</MenuLink></ListItem>
							{false ? 
								<ListItem className={itemClass}><MenuLink closeMenu={closeMenu} to='/contacts'>Contacts</MenuLink></ListItem>
								:
								null
							}
							<ListItem className={itemClass}><MenuLink closeMenu={closeMenu} to='/comments'>Comments</MenuLink></ListItem>
						</ul>
					</div>
				</Container>
			)}
		</PoseGroup>
	);
};
