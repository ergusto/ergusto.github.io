import React from 'react';

import Calendar from '../../lib/calendar.js';

// import styles for this component
require('!style!css!sass!./styles/calendar.scss');

export default class CalendarComponent extends React.Component {
	
	constructor(props) {
		super(props);
		this.calendar = new Calendar();
		console.log(this.calendar);
	}

	generateDateCells() {
		let day = 1;
		const calendar = this.calendar;
		const weeks = [0,1,2,3,4,5,6,7,8];
		const weekdays = [0,1,2,3,4,5,6,7,8];

		return weeks.map((weekNo) => {

			if (day > calendar.currentMonthLength) {
				return;
			}
			
			const weekdayhtml = weekdays.map((dayKey) => {
				let html;

				if (day <= calendar.currentMonthLength && (weekNo > 0 || dayKey >= this.startingDay)) {
					html = <div key={dayKey} className="calendar-day">{day}</div>;
					day++;
				} else {
					html = <div key={dayKey} className="calendar-day"></div>;
				}
				
				return html;

			});

			return (
				<ul key={weekNo} className="calendar-week clearfix">
					{weekdayhtml}
				</ul>
			)

		});
	}

	render() {
		const calendar = this.calendar;

		const dayHeaderList = calendar.days.map((day) => {
			return (
				<li key={day} className="calendar-day-header-item">{day}</li>
			)
		});

		const dateCells = this.generateDateCells();

		return (

			<section className="calendar-example full-height panel">

				<div id="calendar-example" className="example">

					<div className="box calendar">

						<header className="calendar-header">

							<h1>Calendar!</h1>

							<p>{calendar.currentDay}  {calendar.date} {calendar.currentMonth.name} {calendar.year}</p><br/>

							<ul className="calendar-header-day-list">{dayHeaderList}</ul>

						</header>

						<div className="calendar-body">

							{dateCells}

						</div>

					</div>

				</div>
			
			</section>
		);
	}
}