import { createReducer } from 'app/lib';
import getInitialState from './state.js';

import {
	COMMENT_CREATE,
	COMMENT_EDIT,
	COMMENT_DELETE,
	COMMENTS_RESET
} from './actionTypes.js';

export default createReducer({
	[COMMENTS_RESET]: (state, payload) => {
		return getInitialState();
	},
	[COMMENT_CREATE]: (state, payload) => {
		const { comment } = payload;

		return Object.assign({}, state, {
			comments: [].concat([comment], state.comments)
		});
	},
	[COMMENT_EDIT]: (state, payload) => {
		const { comment } = payload;

		return Object.assign({}, state, {
			comments: state.comments.map(object => comment.id === object.id ? comment : object)
		});
	},
	[COMMENT_DELETE]: (state, payload) => {
		const { comment } = payload;
		const comments = state.comments.filter(item => (item.id !== comment.id && item.parentId !== comment.id));

		return Object.assign({}, state, {
			comments
		});
	}
});