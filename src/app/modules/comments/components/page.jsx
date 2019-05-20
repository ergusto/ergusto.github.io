import React from 'react';
import { useLocalStorageReducer } from 'lib';

import { CommentsProvider } from '../context.jsx';
import reducer from '../reducer.js';
import getInitialState from '../state.js';

import List from './list.jsx';

export default function Comments() {
	const [state, dispatch] = useLocalStorageReducer('ergusto:comments', reducer, getInitialState());

	return (
		<div className='page full-height justify-centre padding-horizontal padding-vertical-3'>
			<CommentsProvider state={state} dispatch={dispatch}>
				<List />
			</CommentsProvider>
		</div>
	);
}