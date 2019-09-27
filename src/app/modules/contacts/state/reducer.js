import { createReducer } from 'app/lib';

import {
	CONTACT_CREATE,
	CONTACT_EDIT,
	CONTACT_DELETE
} from './actionTypes.js';

export default createReducer({
	[CONTACT_CREATE]: (state, payload) => {
		const { contact } = payload;

		return Object.assign({}, state, {
			contacts: [].concat([contact], state.contacts)
		});
	},
	[CONTACT_EDIT]: (state, payload) => {
		const { contact } = payload;

		return Object.assign({}, state, {
			contacts: state.contacts.map(object => contact.id === object.id ? contact : object)
		});
	},
	[CONTACT_DELETE]: (state, payload) => {
		const { contact } = payload;

		return Object.assign({}, state, {
			contacts: state.contacts.filter(object => object.id !== contact.id)
		});
	}
});
