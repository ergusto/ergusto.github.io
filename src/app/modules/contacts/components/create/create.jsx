import React, { useContext } from 'react';

import ContactForm from './contact-form.jsx';
import PageBox from '../page-box/page-box.jsx';
import { ContactsContext } from '../../state/context.jsx';
import { CONTACT_CREATE } from '../../state/actionTypes.js';
import { makeContact } from '../../state/state.js';

export default function Create({ onSuccess }) {
	const { dispatch } = useContext(ContactsContext);

	const onCreate = (values, { resetForm, ...rest }) => {
		const contact = makeContact(values);
		if(onSuccess) onSuccess(contact);
		dispatch({ type: CONTACT_CREATE, payload: { contact } }); 
		resetForm();
	};

	return (
		<PageBox>
			<h4 className='font-weight-bold color-muted-blue uppercase margin-bottom'>Create contact</h4>
			<ContactForm onSubmit={onCreate} />
		</PageBox>
	);
}
