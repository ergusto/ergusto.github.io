import React, { createContext } from 'react';

const CommentsContext = createContext(null);

function CommentsProvider(props) {
	const { state, dispatch } = props;
	
	return (
		<CommentsContext.Provider value={{ state, dispatch }}>
			{props.children}
		</CommentsContext.Provider>
	);
}

export { CommentsContext, CommentsProvider };