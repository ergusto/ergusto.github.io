import React, { createContext } from 'react';

const ContactsContext = createContext(null);

function ContactsProvider(props) {
	const { state, dispatch } = props;

	return (
		<ContactsContext.Provider value={{ state, dispatch }}>
			{props.children}
		</ContactsContext.Provider>
	);
}

export { ContactsContext, ContactsProvider };
