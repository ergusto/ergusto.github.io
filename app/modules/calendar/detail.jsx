import React from 'react';
import FormStateBehaviour from '../../behaviours/form.js';
import ActiveModelStateBehaviour from '../../behaviours/active.model.js';

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

	formIsEnabled() {
		const startHour = this.activeStartHour.current;
		const endHour = this.activeEndHour.current;

		return !!startHour && !!endHour;
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
		this.activeStartHour.clear();
		this.activeEndHour.clear();
		this.activeHoveredHour.clear();
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
			const entries = Array.prototype.filter.call(entry.entries, (item) => {
				return item.startHour.substring(0, 2) == hourHour;
			});
			return entries.map((event) => {
				const hourDifference = event.endHour.substring(0, 2) - event.startHour.substring(0, 2);
				// for safari
				let nominalHeight = 43;

				// i hate this browser ecosystem!
				// for chrome & firefox
				if (navigator.userAgent.indexOf('Chrome') > -1 || navigator.userAgent.indexOf('Firefox') > -1) {
					nominalHeight = 42;
				}

				const style = {
					height: ((hourDifference * nominalHeight) - 11) + 'px'
				};

				if (hourDifference == 1) style.paddingTop = '8px';
				return (
					<li onClick={this.stopPropagationHandler} key={event.startHour + event.title + generateID()} style={style} className="calendar-hour-event box-shadow hover-cursor--default">
						<a onClick={this.removeEventHandler.bind(this, event)} href="#" className="pull-right remove-event">x</a>
						<small className="pull-right hour-event-time-text">{event.startHour} to {event.endHour}</small>
						{event.title}
					</li>
				);
			});
		}
	}

	hourClickHandler(hour, event) {
		const { calendarTitleInput } = this.refs;
		if (!this.activeStartHour.current) {
			this.activeStartHour.set(hour);		
		} else {
			if (this.activeStartHour.is(hour) || this.activeEndHour.is(hour)) {
				this.activeStartHour.clear();
				this.activeEndHour.clear();
				this.activeHoveredHour.clear();
			} else {
				if (!this.activeEndHour.is(hour)) {
					if (this.activeStartHour.current) {
						if (this.activeStartHour.current < hour) {
							this.activeEndHour.set(hour);
							setTimeout(function() {
								calendarTitleInput.focus();
							}, 100);
						}
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
					<input ref="calendarTitleInput" placeholder="event" className="field" name="title" disabled={this.formIsEnabled() ? false : true} />
					{errorContent}
					<div className="btn-group">
						<input type="submit" value="submit" className="btn" disabled={this.formIsEnabled() ? false : true}></input>
					</div>
				</form>
			</div>
		);
	}

}