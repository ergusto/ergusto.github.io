import React from 'react';
import Calendar from '../../lib/calendar.js';

import CalendarItemComponent from './item.jsx';

// import styles for this component
require('!style!css!sass!./styles/calendar.scss');

export default class CalendarComponent extends React.Component {

	previousMonthHandler(event) {
		event.preventDefault();
		const month = this.props.month;
		this.props.setMonth(month.getPrevMonth());
	}

	nextMonthHandler(event) {
		event.preventDefault();
		const month = this.props.month;
		this.props.setMonth(month.getNextMonth());
	}

	render() {

		const month = this.props.month;

		const subheaderHTML = this.props.calendar.weekdaysAbbr.map((day) => {
			return <li key={Math.random()} className="padding-sm">{day}</li>;
		});

		const weeksHTML = month.weeks.map((week) => {
			const weekHTML = week.map((day) => {
				if (day.date) {
					return <CalendarItemComponent key={Math.random()} day={day} setActiveDay={this.props.setActiveDay} />
				} else {
					return <li key={Math.random()} className="calendar-day-empty padding-sm"></li>;
				}
			});

			return <ul key={Math.random()} className="calendar-week">{weekHTML}</ul>;
		})

		return (

			<div className="calendar">

				<header className="calendar-header box padding">

					<h2>{month.name} {month.year}</h2>

				</header>

				<div className="calendar-subheader box">
					<a href="#" onClick={this.nextMonthHandler.bind(this)} className="btn btn-large pull-right">next</a>
					<a href="#" onClick={this.previousMonthHandler.bind(this)} className="btn btn-large">previous</a>
				</div>

				<ul className="calendar-subheader box horizontal-list-menu">

					{subheaderHTML}

				</ul>

				<div className="clearfix">

					{weeksHTML}

				</div>

			</div>

		);
	}

}