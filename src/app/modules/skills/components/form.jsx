import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Textarea } from '../form';

const ErrorContainer = posed.div({
	enter: { height: 'auto' },
	exit: { height: 0 }
});

const CommentSchema = Yup.object().shape({
	text: Yup.string().required('required')
});

export default function CommentForm({ title, comment = {}, onSubmit, onCancel }) {
	return (
		<div className="background-color-white border border-color-grey border-radius overflow-hidden box-shadow font-family-raleway padding-bottom padding-horizontal padding-top-medium">
			<small className="color-muted-grey inline-block font-weight-normal margin-left-small margin-bottom-medium margin-top-small">{title}</small>
			<Formik 
				initialValues={comment}
				validationSchema={CommentSchema}
				onSubmit={onSubmit}
				render={({ errors, validateForm }) => (
					<Form> 
						<Field component={Textarea} name='text' className='form-field line-height-copy font-size-medium max-width-100 min-width-100' />
						<PoseGroup flipMove={false}>
							{errors.text ? (
									<ErrorContainer className='overflow-hidden' key='error-container'><p className='font-size-small color-muted-grey margin-left-small margin-top-medium margin-bottom-small'>{errors.text}</p></ErrorContainer>
							) : null}
						</PoseGroup>
						<button type="submit" className="button button--small button--outline color-muted-grey margin-top-medium">Submit</button>
						<button onClick={onCancel} type="button" className="button button--small button--outline color-muted-grey margin-top-medium margin-left-medium">Cancel</button>
					</Form>
				)}
			/>
		</div>
	);
}