import React from 'react';

// import styles for this component
require('!style!css!sass!./styles/calendar.scss');

const current_date = new Date();

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const months = [
	{name: 'January', days: 31}, 
	{name: 'February', days: 28}, 
	{name: 'March', days: 31}, 
	{name: 'April', days: 30},
	{name: 'May', days: 31},
	{name: 'June', days: 30},
	{name: 'July', days: 31},
	{name: 'August', days: 31},
	{name:'September', days: 30},
	{name:'October', days: 31},
	{name:'November', days: 30},
	{name:'December', days: 31}
];

export default class CalendarComponent extends React.Component {
	
	constructor(props) {
		super(props);
		this.month = current_date.getMonth();
		this.year = current_date.getFullYear();

		this.date = current_date.getDate();
		this.currentDayNo = current_date.getDay();
		this.currentDay = days[this.currentDayNo];
		this.firstDayOfMonth = new Date(this.year, this.month, 1);
		this.startingDay = this.firstDayOfMonth.getDay();
		
		this.currentMonth = months[this.month];
		this.day = days[this.startingDay];
		
		this.currentMonthLength = this.currentMonth.days;

		if (this.month == 1) {
			// feb only
			this.currentMonthLength = 29;
		}

	}

	generateDateCells() {
		let day = 1;
		const weeks = [0,1,2,3,4,5,6,7,8];
		const weekdays = [0,1,2,3,4,5,6,7,8];

		return weeks.map((weekNo) => {

			if (day > this.currentMonthLength) {
				return;
			}
			
			const weekdayhtml = weekdays.map((dayKey) => {
				let html;

				if (day <= this.currentMonthLength && (weekNo > 0 || dayKey >= this.startingDay)) {
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

		const dayHeaderList = days.map((day) => {
			return (
				<li className="calendar-day-header-item">{day}</li>
			)
		});

		const dateCells = this.generateDateCells();

		return (

			<section className="calendar-example full-height panel">

				<div id="calendar-example" className="example">

					<div className="box calendar">

						<header className="calendar-header">

							<h1>Calendar!</h1>

							<p>{this.currentDay}  {this.date} {this.currentMonth.name} {this.year}</p><br/>

							<ul className="calendar-header-day-list">{days}</ul>

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