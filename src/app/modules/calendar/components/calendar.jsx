import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CalendarContext } from '../context.jsx';
import WeekComponent from './week.jsx';

import './calendar.scss';

const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

export default function Calendar() {
	const { month, setPreviousMonth, setNextMonth } = useContext(CalendarContext);

	const previousOnClickHandler = event => {
		event.preventDefault();
		setPreviousMonth();
	};

	const nextOnClickHandler = event => {
		event.preventDefault();
		setNextMonth();
	};

	return (
		<div className='relative background-color-white border-radius-large box-shadow-large width-100 centered max-width-14'>
			<header className='relative padding-top-small line-height-header border-color-grey clearfix'>
				<a href='/previous' onClick={previousOnClickHandler} className='calendar-previous-month absolute block no-decoration padding-top-small padding-horizontal font-size-large color-dark-blue color-blue--on-hover font-weight-bold'>
					<FontAwesomeIcon icon='arrow-alt-left' />	
				</a>
				<h3 className='color-dark-blue width-100 text-align-center width-100 inline-block'>{month.name} {month.year}</h3>
				<a href='/next' onClick={nextOnClickHandler} className='calendar-next-month absolute padding-horizontal no-decoration font-size-large padding-top-small color-dark-blue color-blue--on-hover font-weight-bold'>
					<FontAwesomeIcon icon='arrow-alt-right' />	
				</a>
			</header>
			<header className='padding-horizontal padding-top-medium'>
				<ul className='clearfix'>
					{dayNames.map(day => {
						return (
							<li key={day} className='day-header-item inline-block float-left font-weight-semi-bold padding-left-medium font-size-small color-dark-blue'><span>{day}</span></li>
						);
					})}
				</ul>
			</header>
			<div className='padding-horizontal padding-bottom padding-top-medium'>
				<ul className='border-radius'>
					{month.weeks.map((week, index) => <li key={`week-${index}`}><WeekComponent week={week} /></li>)}
				</ul>
			</div>
		</div>
	);
}
