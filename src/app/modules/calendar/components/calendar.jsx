import React, { useState, useContext } from 'react';
import { CalendarContext } from '../context.jsx';
import WeekComponent from './week.jsx';

import './calendar.scss';

export default function Calendar() {
	const { calendar } = useContext(CalendarContext);

	const currentMonth = calendar.getMonth();

	const [month, setCurrentMonth] = useState(currentMonth);

	const setNextMonth = () => {
		const next = month.getNextMonth();
		setCurrentMonth(next);
	};

	const setPreviousMonth = () => {
		const previous = month.getPreviousMonth();
		setCurrentMonth(previous);
	};

	const previousOnClickHandler = event => {
		event.preventDefault();
		setPreviousMonth();
	};

	const nextOnClickHandler = event => {
		event.preventDefault();
		setNextMonth();
	};

	console.log(month.weeks);

	return (
		<div className='background-color-white border-all border-color-grey border-radius box-shadow width-100 centered max-width-14'>
			<header className='calendar-header border-color-grey clearfix'>
				<div className='float-left border-color-grey'>
					<a href='/previous' onClick={previousOnClickHandler} className='block no-decoration padding-horizontal font-size-small color-dark-blue color-blue--on-hover font-weight-bold'>Previous</a>
				</div>
				<div className='float-left'>
					<h3 className='margin-left color-dark-blue text-align-center width-100 inline-block'>{month.name} {month.year}</h3>
				</div>
				<div className='float-right block border-color-grey'>
					<a href='/next' onClick={nextOnClickHandler} className='padding-horizontal no-decoration font-size-small color-dark-blue color-blue--on-hover font-weight-bold'>Next</a>
				</div>
			</header>
			<div className='padding-all'>
				<ul>
					{month.weeks.map((week, index) => <li key={`week-${index}`}><WeekComponent week={week} /></li>)}
				</ul>
			</div>
		</div>
	);
}
