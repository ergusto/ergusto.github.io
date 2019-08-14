import React from 'react';

export default function ({ entry }) {
	const height = (entry.length * 52) - 8

	const style = {
		right: '16px',
		top: '8px',
		left: '96px',
		height: height + 'px',
	};

	return (
		<div style={style} className='background-color-blue absolute border-radius padding-all z-index-1 box-shadow-modal no-pointer-events'>
			<p className='color-white'>{entry.title}</p>	
		</div>
	);
}
