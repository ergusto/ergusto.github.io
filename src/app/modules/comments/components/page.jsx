import React from 'react';
import { useLocalStorageReducer } from 'app/lib';

import { CommentsProvider } from '../state/context.jsx';
import reducer from '../state/reducer.js';
import getInitialState from '../state/state.js';
import { COMMENTS_RESET } from '../state/actionTypes.js';

import List from './list.jsx';

export default function Comments() {
	const [state, dispatch] = useLocalStorageReducer('ergusto:comments', reducer, getInitialState());
	const { comments } = state;

	const parentComments = comments.filter(comment => comment.parentId === null);

	if(!parentComments.length) {
		dispatch({ type: COMMENTS_RESET });
	}

	return (
		<div className='page font-family-raleway full-height justify-centre padding-horizontal padding-top-3 padding-bottom-2'>
			<CommentsProvider state={state} dispatch={dispatch}>
				<List />
			</CommentsProvider>
		</div>
	);
}