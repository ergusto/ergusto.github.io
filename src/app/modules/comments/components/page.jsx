import React from 'react';
import { useLocalStorageReducer } from 'lib';
import { Menu } from 'modules/menu';

import { CommentsProvider } from '../context.jsx';
import reducer from '../reducer.js';
import getInitialState from '../state.js';
import { COMMENTS_RESET } from '../actionTypes.js';

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
			<Menu />
			<CommentsProvider state={state} dispatch={dispatch}>
				<List />
			</CommentsProvider>
		</div>
	);
}