import React from 'react';
import Calendar from '../../lib/calendar.js';

import CalendarItemComponent from './item.jsx';

// import styles for this component
require('!style!css!sass!./styles/calendar.scss');

export default class CalendarComponent extends React.Component {

	previousMonthHandler(event) {
		event.preventDefault();
		const { month, setMonth } = this.props;
		setMonth(month.getPrevMonth());
	}

	nextMonthHandler(event) {
		event.preventDefault();
		const { month, setMonth } = this.props;
		setMonth(month.getNextMonth());
	}

	render() {

		const { month, calendar, diary, setActiveDay } = this.props;

		const subheaderHTML = calendar.weekdaysAbbr.map((day) => {
			return <li key={Math.random()} className="padding-sm">{day}</li>;
		});

		const calendarHTML = month.weeks.map((week) => {
			const weekHTML = week.map((day) => {
				if (day.date) {
					return <CalendarItemComponent key={Math.random()} day={day} diary={diary} setActiveDay={setActiveDay} />
				} else {
					return <li key={Math.random()} className="calendar-day-empty padding-sm"></li>;
				}
			});

			return <ul key={Math.random()} className="calendar-list calendar-week clearfix">{weekHTML}</ul>;
		})

		return (

			<div className="calendar box">

				<header className="calendar-header padding muted">

					<h2>{month.name} {month.year}</h2>

				</header>

				<ul className="calendar-buttons calendar-subheader horizontal-list-menu--btns border-vertical">
					<li className="pull-right"><a href="#" onClick={this.nextMonthHandler.bind(this)} className="btn pull-right">next</a></li>
					<li><a href="#" onClick={this.previousMonthHandler.bind(this)} className="btn">previous</a></li>
				</ul>

				<ul className="calendar-subheader horizontal-list-menu muted border-bottom">

					{subheaderHTML}

				</ul>

				<div className="clearfix bg-gray">

					{calendarHTML}

				</div>

			</div>

		);
	}

}