import React, { useContext } from 'react';
import Form from './form.jsx';
import { CommentsContext } from '../context.jsx';
import { COMMENT_CREATE } from '../actionTypes.js';
import { makeComment } from '../state.js';

export default function ReplyForm({ comment, onSuccess, onCancel, actions }) {
	const { dispatch } = useContext(CommentsContext);

	const submit = data => {
		onSuccess();
		dispatch({ type: COMMENT_CREATE, payload: { comment: makeComment({ ...data, parentId: comment.id }) }});
	};

	return <Form title="reply" onSubmit={submit} onCancel={onCancel} />;
}