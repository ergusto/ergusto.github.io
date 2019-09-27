import { generateId, slugify } from 'app/lib/lib.js';

export default function() {
	return {
		contacts: []
	};
}

export const makeContact = contact => {
	const id = generateId();

	return {
		id,
		firstName: '',
		lastName: '',
		phoneNumber: '',
		slug: contact ? slugify(`${id}-${contact.firstName}-${contact.lastName}`) : '',
		...contact
	};
};
