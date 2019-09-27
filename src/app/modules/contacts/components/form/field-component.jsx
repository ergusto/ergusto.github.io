import React from 'react';
import posed, { PoseGroup } from 'react-pose';

import './field-component.scss';

const ErrorContainer = posed.div({
	enter: { height: 'auto' },
	exit: { height: 0 }
});

export default function FieldComponent({ field, form, halfWidth, label, containerClassName: containerClassNameProp, className: classNameProp, ...props }) {
	let containerClassName = '',
		className = 'contact-field color-muted-blue border-color-light-muted-blue border padding-all-medium border-radius';

	if(classNameProp) className += ` ${classNameProp}`;
	if(halfWidth) containerClassName += ' width-50 float-left';
	if(containerClassNameProp) containerClassName += ` ${containerClassNameProp}`;

	return (
		<div className={containerClassName}>
			<label htmlFor={field.name} className='font-size-small color-muted-blue font-weight-medium inline-block margin-bottom-small capitalise'>{label ? label : field.name}</label>
			<input type='text' className={className} {...field} {...props} />
			<PoseGroup flipMove={false}>
				{(form.touched[field.name] && form.errors[field.name]) ? (
					<ErrorContainer key={'error-' + field.name} className='overflow-hidden'>
						<p className='font-size-small color-red font-weight-medium margin-left-medium margin-top-medium capitalise'>{form.errors[field.name]}</p>
					</ErrorContainer>
				) : null}
			</PoseGroup>
		</div>
	);
}
