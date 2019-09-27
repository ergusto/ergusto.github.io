import React from 'react';
import './page-box.scss';

export default function({ children }) {
	return (
		<div className='page-box padding-all margin-bottom-3 centered background-color-white border border-color-blue-grey box-shadow max-width-7 border-radius-large'>
			{children}
		</div>
	);
}
