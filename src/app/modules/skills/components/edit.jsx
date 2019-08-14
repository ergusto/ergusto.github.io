import React, { useContext } from 'react';
import Form from './form.jsx';
import { CommentsContext } from '../context.jsx';
import { COMMENT_EDIT } from '../actionTypes.js';

export default function EditForm({ comment, onSuccess, onCancel, actions }) {
	const { dispatch } = useContext(CommentsContext);

	const onSubmit = comment => {
		onSuccess();
		dispatch({ type: COMMENT_EDIT, payload: { comment }});
	};

	return <Form title="edit" onSubmit={onSubmit} onCancel={onCancel} comment={comment} />;
}