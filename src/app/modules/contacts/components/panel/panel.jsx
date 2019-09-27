import React from 'react';
import useWindowSize from '../../../../lib/hooks/useWindowSize.js';

import './panel.scss';

export default function Panel({ children }) {
	const windowSize = useWindowSize();

	return (
		<div className='panel background-color-white box-shadow border-right border-color-blue-grey' style={{ minHeight: windowSize.height }}>
			{children}
		</div>
	);
}
