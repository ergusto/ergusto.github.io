import React, { useState, useRef } from 'react';
import posed from 'react-pose';
import DayDetail from '../day-detail/day-detail.jsx';
import DayItem from '../day-item/day-item.jsx';

import './day.scss';

const transition = {
	duration: 500,
	ease: [0.42, 0.69, 0.2, 0.99]
};

const Frame = posed.div({
	init: {
		position: 'static',
		transition,
		flip: true,
		width: 'auto',
		height: '121px'
	},
	zoomed: {
		position: 'absolute',
		transition,
		top: '0px',
		left: '0px',
		bottom: '0px',
		right: '0px',
		height: 'auto',
		flip: true
	}
});

export default function Day({ day }) {
	const frameRef = useRef(null);
	const [isZoomed, setIsZoomed] = useState(false);

	let className = 'calendar-day border-radius-large';

	if(day.empty) {
		className = `${className} calendar-day--empty`;

		return (
			<div className={className}>
				<div className='calendar-day-inner' />
			</div>
		);
	}

	if(day.isToday) {
		className = `${className} calendar-day--is-today`;
	}

	className = `${className} calendar-day--date`;

	if(isZoomed) {
		className = `${className} calendar-day--is-zoomed`;
	} else {
		className = `${className} calendar-day--is-not-zoomed`;
	}

	const unzoom = () => setIsZoomed(false);
	const zoom = () => setIsZoomed(true);

	const onWrapperClick = event => {
		if(!isZoomed) zoom();
	};
	
	return (
		<div onClick={onWrapperClick} className={className}>
			<Frame ref={frameRef} pose={isZoomed ? 'zoomed' : 'init'} className='calendar-day-inner background-color-white border-radius-large'>
				{isZoomed ? <DayDetail close={unzoom} day={day} /> : <DayItem day={day} />}
			</Frame>
		</div>
	);

}
