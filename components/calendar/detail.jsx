import _ from 'lodash';
import React from 'react';
import FormStateBehaviour from '../../behaviours/form.js';
import ActiveModelStateBehaviour from '../../behaviours/active.model.js';

import { validate24HourTime, generateID } from '../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./styles/detail.scss');

export default class CalendarDetailComponent extends React.Component {

	constructor() {
		super();
		this.state = {};
	 	this.form = new FormStateBehaviour(this);
		this.activeHour = new ActiveModelStateBehaviour(this);
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
		const { calendarTitleInput } = this.refs;
		
		if (!entry) entry = diary.shell();

		const titleValue = calendarTitleInput.value;
		const timeValue = this.activeHour.current;

		if (!titleValue) {
			form.addError('please enter a title');
			return;
		}

		if (!timeValue) {
			form.addError('please click an hour to select the event time');
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
		calendarTitleInput.value = '';
		this.activeHour.clear();
	}

	stopPropagationHandler(event) {
		event.stopPropagation();
	}

	removeEventHandler(entryEvent, event) {
		event.preventDefault();
		const { entry, diary } = this.props;
		const index = entry.entries.indexOf(entryEvent);
		if (index > -1) {
			entry.entries.splice(index, 1);
		}
		diary.update(entry);
	}

	getEventsForHour(hour) {
		const { entry } = this.props;

		if (entry) {
			const hourHour = hour.substring(0, 2);
			const entries = _.filter(entry.entries, (item) => {
				return item.time.substring(0, 2) == hourHour;
			});
			return entries.map((event) => {
				return (
					<li onClick={this.stopPropagationHandler} key={event.time + event.title + generateID()} className="calendar-hour-event hover-cursor--default">
						<a onClick={this.removeEventHandler.bind(this, event)} href="#" className="pull-right remove-event">x</a>
						{event.title}
					</li>
				);
			});
		}
	}

	toggleSelectedHour(hour, event) {
		if (this.activeHour.current == hour) {
			this.activeHour.clear();
		} else {
			const { calendarTitleInput } = this.refs;
			this.activeHour.set(hour);
			calendarTitleInput.focus();
		}
	}

	generateHourHTML() {
		const { day, calendar, entry } = this.props;

		const hourList = calendar.hours.map((hour) => {
			let className = "calendar-hour hover-cursor--pointer";
			if (this.activeHour.is(hour)) className = className + ' active-hour';
			const events = this.getEventsForHour(hour);
			return (
				<li className={className} key={hour} onClick={this.toggleSelectedHour.bind(this, hour)}>
					<div className="calendar-hour-time padding-horizontal">{hour}</div>
					<ul className="calendar-hour-events">{events}</ul>
				</li>
			);
		});

		return  <ul className="calendar-hour-list">{hourList}</ul>;

	}

	render() {
		let errorContent;
		const { error } = this.form;
		const { day } = this.props;
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
				<form onSubmit={this.submitHandler.bind(this)} className="calendar-form padding border-top">
					<input ref="calendarTitleInput" placeholder="event" className="field" name="title" />
					{errorContent}
					<div className="btn-group">
						<input type="submit" value="submit" className="btn"></input>
					</div>
				</form>
			</div>
		);
	}

}