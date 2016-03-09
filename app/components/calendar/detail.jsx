import React from 'react';
import FormStateBehaviour from '../../behaviours/form.js';

import Tools from '../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./styles/detail.scss');

export default class CalendarDetailComponent extends React.Component {

	constructor() {
		super();
		this.state = {};
	 	this.form = new FormStateBehaviour(this);
	}

	showCalendarHandler(event) {
		event.preventDefault();
		this.props.showCalendar();
	}

	submitHandler(event) {
		event.preventDefault();
		const form = this.form;
		const entryEvent = {};
		let { day, diary, entry } = this.props;
		const { calendarTitleInput, calendarTimeInput } = this.refs;
		
		if (!entry) entry = diary.shell();

		const titleValue = calendarTitleInput.value;
		const timeValue = calendarTimeInput.value;
		const timeIsFormattedCorrectly = Tools.validate24HourTime(timeValue);

		if (!titleValue) {
			form.addError('please enter a title');
			return;
		}

		if (!timeIsFormattedCorrectly) {
			form.addError('please enter a time in the format: HH:MM (e.g. 06:00)');
			return;
		}

		entryEvent.title = titleValue;
		entryEvent.time = timeValue;

		entry.entries.push(entryEvent);

		if (entry.id) {
			diary.update(entry);
		} else {
			entry.identifier = day.identifier;
			diary.create(entry);
		}

		form.clearError();
		calendarTimeInput.value = '';
		calendarTitleInput.value = '';
	}

	getEventsForHour(hour) {
		const { entry } = this.props;

		if (entry) {
			return entry.entries.map((event) => {
				if (event.time.substring(0, 2) == hour.hour.substring(0, 2)) {
					return <li key={event.time + event.title} className="calendar-hour-event">{event.title}</li>;
				}
			});
		}
	}

	selectHour(hour) {
		const { calendarTitleInput, calendarTimeInput } = this.refs;
		calendarTimeInput.value = hour.hour;
		calendarTitleInput.focus();
	}

	generateHourHTML() {
		const { day, entry } = this.props;

		const hourList = day.hours.map((hour, index) => {
			const events = this.getEventsForHour(hour);
			return (
				<li className="calendar-hour padding-horizontal padding-vertical-sm border-bottom hover-cursor--pointer" key={hour.hour} onClick={this.selectHour.bind(this, hour)}>
					<div className="calendar-hour-time">{hour.hour}</div><ul className="calendar-hour-events margin-left">{events}</ul>
				</li>
			);
		});

		return  <ul className="calendar-hour-list">{hourList}</ul>;

	}

	render() {
		const { error } = this.form;
		const { day } = this.props;
		let errorContent;
		const hourHTML = this.generateHourHTML();

		if (error) {
			errorContent = <span className="form-error">{error}</span>;
		}

		return (
			<div className="calendar-detail box muted">
				<header className="calendar-detail-header padding">
					<h2>{day.date} {day.month} {day.year}</h2>
				</header>

				<ul className="calendar-buttons calendar-subheader horizontal-list-menu--btns border-vertical">
					<li><a className="btn btn-large" href="#" onClick={this.showCalendarHandler.bind(this)}>back</a></li>
				</ul>
				<div className="calendar-body">
					{hourHTML}
				</div>
				<form onSubmit={this.submitHandler.bind(this)} className="padding border-top">

					<input ref="calendarTitleInput" placeholder="title" className="field" name="title" />
					<input ref="calendarTimeInput" placeholder="time (hh:mm)" className="field" name="time" />
					{errorContent}
					<div className="btn-group">
						<input type="submit" value="submit" className="btn"></input>
					</div>

				</form>
			</div>
		)
	}

}