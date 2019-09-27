import React from 'react';

import './item.scss';

export default function({ skill }) {
	return (
		<div className="skill-item block background-color-white margin-all box-shadow-large border-radius cursor-pointer outline-none">
			<div style={{ background: skill.gradient, backgroundSize: '200% 200%' }} className='skill-item-background block padding-all min-height-1 border-top-radius'>
				<h3 className='color-white font-weight-bold'>{skill.title}</h3>
			</div>
			<div className='padding-all color-dark-grey'>
				{skill.description}
			</div>
		</div>
	);
}