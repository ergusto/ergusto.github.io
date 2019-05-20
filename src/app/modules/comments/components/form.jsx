import React from 'react';
import { useFormState } from 'react-use-form-state';
import { validator } from '../validator.js';

export default function CommentForm({ title, comment = {}, onSubmit, onCancel }) {
	const [formState, { text }] = useFormState(comment);

	const submit = data => {
		const { values } = formState;
		onSubmit(values);
	};

	return (
		<div className="background-color-white border border-color-grey border-radius overflow-hidden box-shadow font-family-raleway padding-bottom padding-horizontal padding-top-medium">
			<small className="color-muted-grey inline-block font-weight-normal margin-bottom-medium margin-top-small">{title}</small>
			<form onSubmit={submit}>
				<textarea {...text('text')} required className="form-field line-height-copy font-size-medium max-width-100 min-width-100"></textarea>
				<button type="submit" className="button button--small button--outline color-muted-grey margin-top-medium">Submit</button>
				<button onClick={onCancel} type="button" className="button button--small button--outline color-muted-grey margin-top-medium margin-left-medium">Cancel</button>
			</form>
		</div>
	);
}