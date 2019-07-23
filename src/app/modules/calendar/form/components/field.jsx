import React, { useState } from 'react';
import classnames from 'classnames';

import './field.scss';

const FieldComponent = ({
	field,
	className,
	form: { touched, errors, values },
	...props
}) => {
	const { onBlur: onInputBlur, ...restField } = field;

	const [isFocused, setIsFocused] = useState(false);

	const onFocus = () => setIsFocused(true);
	const onBlur = event => {
		setIsFocused(false);
		onInputBlur(event);
	};

	return (
		<div className=''>
			<input 
				className={classnames('calendar-form-field form-field color-dark-grey font-weight-medium line-height-copy font-size-medium max-width-100 min-width-100', className, {
					'calendar-form-field--closed': !isFocused,
					'calendar-form-field--open': !!isFocused,
					'calendar-form-field--error': !!(touched[field.name] && errors[field.name]),
				})} 
				type="text" 
				onFocus={onFocus}
				onBlur={onBlur}
				{...restField}
				{...props} 
			/>
		</div>
	);
};

export default FieldComponent;
