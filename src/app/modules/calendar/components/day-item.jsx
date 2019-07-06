import React from 'react';
import './day-item.scss';

export default function DayItem({ day }) {
	let className = 'day-item min-height-100 border-radius-large padding-all-medium background-color-light-grey--on-hover'
	
	return (
		<div className={className}>
			<p className='font-size-small font-weight-semi-bold'>{day.date}</p>	
		</div>
	);
}
