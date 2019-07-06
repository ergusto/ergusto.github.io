import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CalendarContext } from '../context.jsx';
import HourItem from './hour-item.jsx';

import './day-detail.scss';

export default function DayDetail({ day, close }) {
	const { calendar } = useContext(CalendarContext);
	const [startHour, setStartHour] = useState(null);
	const [endHour, setEndHour] = useState(null);

	const onCloseClick = event => {
		event.preventDefault();
		close();
	};

	const setHour = hour => {
		if(!startHour) {
			setStartHour(hour);
		} else {
			setEndHour(hour);
		}
	};

	return (
		<div className='max-height-100 overflow-y-scroll relative padding-bottom padding-top-small'>
			<header>
				<button onClick={onCloseClick} className='day-detail-close line-height-header absolute cursor-pointer inline-block no-decoration padding-top-small padding-horizontal font-size-large color-dark-blue color-blue--on-hover font-weight-bold'>
					<FontAwesomeIcon icon='times' />
				</button>
				<h3 className='line-height-header color-dark-blue font-weight-semi-bold width-100 text-align-center'>{day.date} {day.month}</h3>
			</header>
			<div className='padding-top padding-horizontal'>
				<ul>
					{calendar.hours.map(hour => {
						return (
							<HourItem key={hour} hour={hour} setHour={setHour} startHour={startHour} endHour={endHour} />
						);
					})}
				</ul>
			</div>
		</div>
	);
}
