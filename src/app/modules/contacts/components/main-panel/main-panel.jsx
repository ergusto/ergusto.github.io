import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactList from '../contact-list/contact-list.jsx';

import Panel from '../panel/panel.jsx';

export default function MainPanel() {
	return (
		<Panel>
			<header className='background-color-blue padding-all box-shadow'>
				<Link to='/contacts/create' className='color-white float-right line-height-normal scale-on-hover no-outline'><FontAwesomeIcon icon='plus' /></Link> 
				<h1 className='color-white font-family-comfortaa font-size-big line-height-normal no-select'>
					<Link to='/contacts' className='no-outline margin-right color-white scale-on-hover'>
						<FontAwesomeIcon icon='address-book' />
					</Link>
					Contacts
				</h1>
			</header>
			<div>
				<ContactList />
			</div>
		</Panel>
	);
}
