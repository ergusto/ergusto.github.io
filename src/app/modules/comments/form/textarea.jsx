import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';

import './textarea.scss';

const FieldComponent = ({
	field,
	className,
	form: { touched, errors, values, setFieldValue },
	...props
}) => {
	const { onBlur: onInputBlur, onChange: onInputChange, ...restField } = field;

	const textareaEl = useRef(null);

	const [isFocused, setIsFocused] = useState(false);
	const onFocus = () => setIsFocused(true);

	const setHeight = () => {
		textareaEl.current.style.height = 'auto';
		textareaEl.current.style.height = (textareaEl.current.scrollHeight + 2) + 'px';
	};

	const onBlur = event => {
		setIsFocused(false);
		onInputBlur(event);
	};

	const onChange = event => {
		setHeight();
		onInputChange(event);
	};

	useEffect(() => setHeight());

	return (
		<div className=''>
			<textarea
				className={classnames('comments-textarea comments-form-field form-field color-dark-grey line-height-copy font-size-medium max-width-100 min-width-100', className, {
					'comments-form-field--closed comments-textarea--closed': !isFocused,
					'comments-form-field--open comments-textarea--open': !!isFocused,
					'comments-form-field--error comments-textarea--error': !!(touched[field.name] && errors[field.name]),
				})} 
				ref={textareaEl}
				type="text" 
				onFocus={onFocus}
				onChange={onChange}
				onBlur={onBlur}
				rows={2}
				{...restField}
				{...props} 
			/>
		</div>
	);
};

export default FieldComponent;
