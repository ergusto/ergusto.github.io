import React, { useContext } from 'react';
import { ContactsContext } from '../../state/context.jsx';

import ContactItem from './contact-item.jsx';

export default function ContactList() {
	const { state: { contacts } } = useContext(ContactsContext);

	if(!contacts.length) {
		return (
			<div className='padding-all-2'>
				<h4 className='color-muted-blue font-weight-normal text-align-center'>No contacts found</h4>
			</div>
		);
	}

	contacts.sort((contactA, contactB) => contactA.firstName < contactB.firstName ? -1 : 1);

	return (
		<ul className=''>
			{contacts.map(contact => <ContactItem key={contact.id} contact={contact} />)}
		</ul>
	);
}
