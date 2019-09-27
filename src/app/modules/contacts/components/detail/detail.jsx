import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContactsContext } from '../../state/context.jsx';
import PageBox from '../page-box/page-box.jsx';
import { CONTACT_DELETE } from '../../state/actionTypes.js';

const getContactFromSlug = (contacts, slug) => {
	return contacts.find(contact => contact.slug === slug);
};

export default function({ match }) {
	const { slug } = match.params,
		{ state: { contacts }, dispatch } = useContext(ContactsContext);

	const contact = getContactFromSlug(contacts, slug);

	if(!contact) {
		return (
			<PageBox>
				<h3 className='color-muted-blue'>Uh oh! Contact not found</h3>	
			</PageBox>
		);
	}

	const deleteCalendar = () => {
		dispatch({ type: CONTACT_DELETE, payload: { contact }});
	};

	return (
		<PageBox>
			<h3 className='color-muted-blue'>
				<FontAwesomeIcon icon='user' className='margin-right-medium' />
				{`${contact.firstName} ${contact.lastName}`}
			</h3>
			<button className='color-muted-blue' onClick={deleteCalendar}>
				<FontAwesomeIcon icon='trash-alt' className='margin-right-medium' />
			</button>
		</PageBox>
	);
}
