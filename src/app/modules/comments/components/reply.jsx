import React, { useContext } from 'react';
import Form from './form.jsx';
import { CommentsContext } from '../state/context.jsx';
import { COMMENT_CREATE } from '../state/actionTypes.js';
import { makeComment } from '../state/state.js';

export default function ReplyForm({ comment, onSuccess, onCancel, actions }) {
	const { dispatch } = useContext(CommentsContext);

	const onSubmit = data => {
		onSuccess();
		dispatch({ type: COMMENT_CREATE, payload: { comment: makeComment({ ...data, parentId: comment.id }) }});
	};

	return <Form title="reply" onSubmit={onSubmit} onCancel={onCancel} />;
}