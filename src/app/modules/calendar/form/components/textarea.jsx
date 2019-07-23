import React, { useState, useRef } from 'react';
import classnames from 'classnames';

import './field.scss';
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

	const setToInitialHeight = () => textareaEl.current.style.height = '3.125rem';

	const setAutoHeight = () => {
		textareaEl.current.style.height = 'auto';
		textareaEl.current.style.height = (textareaEl.current.scrollHeight + 2) + 'px';
	};

	const setHeight = value => {
		if(value.length) {
			if(value.trim()) {
				if(value.indexOf("\n") >= 0) {
					setAutoHeight();
				} else {
					setToInitialHeight();
				}
			} else {
				if(value.indexOf("\n") === -1) {
					setFieldValue(field.name, '');
					setToInitialHeight();
				} else {
					setAutoHeight();
				}
			}
		} else {
			setToInitialHeight();
		}
	};

	const onBlur = event => {
		setHeight(event.target.value);
		setIsFocused(false);
		onInputBlur(event);
	};

	const onChange = event => {
		setHeight(event.target.value);
		onInputChange(event);
	};

	return (
		<div className=''>
			<textarea
				className={classnames('calendar-textarea calendar-form-field form-field color-dark-grey font-weight-medium line-height-copy font-size-medium max-width-100 min-width-100', className, {
					'calendar-form-field--closed calendar-textarea--closed': !isFocused,
					'calendar-form-field--open calendar-textarea--open': !!isFocused,
					'calendar-form-field--error calendar-textarea--error': !!(touched[field.name] && errors[field.name]),
				})} 
				ref={textareaEl}
				type="text" 
				onFocus={onFocus}
				onChange={onChange}
				onBlur={onBlur}
				rows={1}
				{...restField}
				{...props} 
			/>
		</div>
	);
};

export default FieldComponent;
