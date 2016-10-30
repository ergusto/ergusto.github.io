import React from 'react';
import FormStateBehaviour from '../../behaviours/form.js';
import ActiveModelStateBehaviour from '../../behaviours/active.model.js';
import CalendarEventComponent from './event.jsx';

import { validate24HourTime, generateID, generateCorrectEndHour } from '../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./styles/detail.scss');

export default class CalendarDetailComponent extends React.Component {

	constructor() {
		super();
		this.state = {};
	 	this.form = new FormStateBehaviour(this);
		this.activeHour = new ActiveModelStateBehaviour(this);
		this.activeStartHour = new ActiveModelStateBehaviour(this);
		this.activeEndHour = new ActiveModelStateBehaviour(this);
		this.activeHoveredHour = new ActiveModelStateBehaviour(this);
	}

	showCalendarHandler(event) {
		event.preventDefault();
		this.props.showCalendar();
	}

	submitHandler(event) {
		event.preventDefault();
		const form = this.form;
		const entryEvent = {};
		const { day, diary } = this.props;
		const entry = this.props.entry || diary.shell();
		const { calendarTitleInput } = this.refs;

		const titleValue = calendarTitleInput.value;
		const startHour = this.activeStartHour.current;
		const endHour = this.activeEndHour.current;

		if (!titleValue) {
			form.addError('please enter a title for this event');
			return;
		}
		
		calendarTitleInput.value = '';
		calendarTitleInput.blur();

		entryEvent.title = titleValue;
		entryEvent.startHour = startHour;
		entryEvent.endHour = generateCorrectEndHour(endHour);

		entry.entries.push(entryEvent);

		if (entry.id) {
			diary.update(entry);
		} else {
			entry.identifier = day.identifier;
			diary.create(entry);
		}

		form.clearError();
		this.clearActiveState();
	}

	getEventsForHour(hour) {
		const { entry, diary } = this.props;
		const currentStartHour = this.activeStartHour.current;
		const currentEndHour = this.activeEndHour.current;

		if (entry) {
			const entries = Array.prototype.filter.call(entry.entries, (item) => {
				return item.startHour.substring(0, 2) == hour.substring(0, 2);
			});
			const entriesLength = entries.length;
			return entries.map((event) => {
				return <CalendarEventComponent key={event.startHour + event.title + generateID()} diary={diary} entry={entry} event={event} entriesLength={entriesLength} currentStartHour={currentStartHour} currentEndHour={currentEndHour} />
			});
		}
	}

	clearActiveState() {
		this.activeStartHour.clear();
		this.activeEndHour.clear();
		this.activeHoveredHour.clear();
		this.form.clearError();
	}

	hourClickHandler(hour, event) {
		if (!this.activeStartHour.current) {
			this.activeStartHour.set(hour);		
		} else {
			if (this.activeStartHour.is(hour)) {
				if (!this.activeEndHour.current) {
					this.activeEndHour.set(hour);
					setTimeout(() => {
						this.refs.calendarTitleInput.focus();
					}, 100);
				} else {
					this.clearActiveState();
				}
			} else if (this.activeEndHour.is(hour)) {
				this.clearActiveState();
			} else {
				if (this.activeStartHour.current) {
					if (this.activeStartHour.current < hour) {
						this.activeEndHour.set(hour);
						setTimeout(() => {
							this.refs.calendarTitleInput.focus();
						}, 100);
					}
				}
			}
		}
	}

	hourMouseEnterHandler(hour, event) {
		if (!!this.activeStartHour.current) {
			this.activeHoveredHour.set(hour);
		}
	}

	hourMouseLeaveHandler(hour, event) {
		if (!!this.activeStartHour.current && !!this.activeHoveredHour.current) {
			this.activeHoveredHour.clear();
		}
	}

	generateHourHTML() {
		const { day, calendar, entry } = this.props;
		const startHour = this.activeStartHour.current;
		const endHour = this.activeEndHour.current;
		const hoveredHour = this.activeHoveredHour.current;

		const hourList = calendar.hours.map(hour => {
			let className = 'calendar-hour';
			if (startHour == hour) className += ' active-start-hour';
			if (endHour == hour) className += ' active-end-hour';
			if (hour > startHour && hour < endHour || startHour == hour || endHour == hour) className += ' selected-hour';
			if (((!!startHour && !endHour) && !!hoveredHour) && ((hour > startHour) && hour <= hoveredHour)) className += ' hovered-hour';
			if ((!!startHour && (hour > startHour)) || (startHour == hour || endHour == hour) || (!startHour && !endHour)) {
				className += ' hover-cursor--pointer selectable-hour';
			}
			const events = this.getEventsForHour(hour);
			return (
				<li className={className} key={hour} onClick={this.hourClickHandler.bind(this, hour)} 
					onMouseEnter={this.hourMouseEnterHandler.bind(this, hour)}
					onMouseLeave={this.hourMouseLeaveHandler.bind(this, hour)}>
					<div className="calendar-hour-time padding-horizontal">{hour}</div>
					<ul className="calendar-hour-events">{events}</ul>
				</li>
			);
		});

		return <ul className="calendar-hour-list clearfix">{hourList}</ul>;
	}

	shouldShowForm() {
		return !!this.activeStartHour.current && !!this.activeEndHour.current;
	}

	cancelForm(event) {
		event.preventDefault();
		this.clearActiveState();
	}

	render() {
		let errorContent, eventForm;
		const { error } = this.form;
		const { day } = this.props;
		const hourHTML = this.generateHourHTML();

		if (error) {
			errorContent = <span className="form-error">{error}</span>;
		}

		if (this.shouldShowForm()) {
			eventForm = (
				<div className="calendar-form-wrapper justify-centre">
					<form onSubmit={this.submitHandler.bind(this)} className="calendar-form box padding border-top">
						<input ref="calendarTitleInput" placeholder="event" className="field" name="title" />
						{errorContent}
						<div className="btn-group">
							<input type="submit" value="submit" className="btn"></input>
							<a href="#" className="btn" onClick={this.cancelForm.bind(this)}>cancel</a>
						</div>
					</form>
				</div>
			);
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
					{eventForm}
				</div>
			</div>
		);
	}

}