import React from 'react';

export default function ({ entry }) {
	const height = (entry.length * 16) - 8

	const style = {
		right: '16px',
		top: '8px',
		left: '96px',
		height: height + 'px',
		background: 'purple'
	};

	return (
		<div style={style} className='background-color-white absolute'>
			<p>{entry.title}</p>	
		</div>
	);
}
