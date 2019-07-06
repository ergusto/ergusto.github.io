import React from 'react';

export default function HourItem({ hour, setHour }) {
	const itemClickHandler = () => {
		setHour(hour);
	};

	return (
		<li onClick={itemClickHandler} className='padding-horizontal border-bottom clearfix border-color-light-grey background-color-light-grey--on-hover cursor-pointer no-outline'>
			<div className='padding-vertical float-left'>
				<p>{hour}</p>
			</div>
		</li>
	);
}
