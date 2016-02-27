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
		const titleValue = this.refs.calendarTitleInput.value;
		const timeValue = this.refs.calendarTimeInput.value;
		const descriptionValue = this.refs.calendarDescriptionInput.value;
		const entry = this.props.entry || this.props.diary.shell();
		const entryEvent = {};
		const timeIsFormattedCorrectly = Tools.validate24HourTime(timeValue);

		if (!titleValue) {
			this.form.addError('please enter a title');
			return;
		}

		if (!timeIsFormattedCorrectly) {
			this.form.addError('please enter a time in the format: 12:00');
			return;
		}

		entryEvent.title = titleValue;
		entryEvent.time = timeValue;
		entryEvent.description = descriptionValue;

		entry.entries.push(entryEvent);

		if (entry.id) {
			this.props.diary.update(entry);
		} else {
			entry.identifier = this.props.day.identifier;
			this.props.diary.create(entry);
		}

		this.form.clearError();
		this.refs.calendarTitleInput.value = '';
		this.refs.calendarTimeInput.value = '';
		this.refs.calendarDescriptionInput.value = '';
	}

	generateEntryHTML() {
		let entryList;
		const entry = this.props.entry;
		if (entry) {
			const entries = entry.entries;
			if (entries.length) {
				const sortedEntries = _.sortBy(entries, 'time');
				entryList = sortedEntries.map((entry) => {
					return (
						<li key={entry.title}>{entry.time} - {entry.title}</li>
					);
				});
			} else {
				entryList = <li>No entries!</li>;
			}
		} else {
			entryList = <li>No entries!</li>;
		}
		return  <ul className="calendar-entry-list padding padding-top-sm">{entryList}</ul>;
	}

	render() {
		const err = this.form.error;
		const day = this.props.day;
		let errContent;
		const entryHTML = this.generateEntryHTML();

		if (err) {
			errContent = (<span className="form-error">{err}</span>);
		}

		return (
			<div className="calendar-detail">
				<header className="calendar-detail-header padding box">
					<h2>{day.date} {day.month} {day.year}</h2>
				</header>

				<ul className="calendar-buttons calendar-subheader horizontal-list-menu--btns box">
					<li><a className="btn btn-large" href="#" onClick={this.showCalendarHandler.bind(this)}>back</a></li>
				</ul>

				<div className="calendar-body box">
					<div className="padding padding-bottom-sm">
						<h3>events:</h3>
					</div>
					{entryHTML}
					<form onSubmit={this.submitHandler.bind(this)} className="padding border-top">

						<input ref="calendarTitleInput" placeholder="title" className="field" name="title" />
						<input ref="calendarTimeInput" placeholder="time (hh:mm)" className="field" name="time" />
						<textarea ref="calendarDescriptionInput" placeholder="description" className="field" name="text"></textarea>
						{errContent}
						<div className="btn-group">
							<input type="submit" value="submit" className="btn"></input>
						</div>

					</form>
				</div>
			</div>
		)
	}

}