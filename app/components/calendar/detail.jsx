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
		const entryEvent = {};
		let { day, diary, entry } = this.props;
		if (!entry) entry = diary.shell();

		const titleValue = this.refs.calendarTitleInput.value;
		const timeValue = this.refs.calendarTimeInput.value;
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

		entry.entries.push(entryEvent);

		if (entry.id) {
			diary.update(entry);
		} else {
			entry.identifier = day.identifier;
			diary.create(entry);
		}

		this.form.clearError();
		this.refs.calendarTimeInput.value = '';
		this.refs.calendarTitleInput.value = '';
	}

	generateEntryHTML() {
		
		let entryList;
		const { entry } = this.props;

		if (entry) {
			const { entries } = entry;
			if (entries.length) {
				const sortedEntries = _.sortBy(entries, 'time');
				entryList = sortedEntries.map((entry) => {
					return (
						<li key={entry.title} className="margin-bottom-sm">{entry.time} - {entry.title}</li>
					);
				});
			}
		}

		if (!entryList) {
			entryList = <li>No entries!</li>;
		}

		return  <ul className="calendar-entry-list padding padding-top-sm">{entryList}</ul>;

	}

	render() {
		const { error } = this.form;
		const { day } = this.props;
		let errorContent;
		const entryHTML = this.generateEntryHTML();

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
					<div className="padding-except-bottom">
						<h3>events:</h3>
					</div>
					{entryHTML}
					<form onSubmit={this.submitHandler.bind(this)} className="padding border-top">

						<input ref="calendarTitleInput" placeholder="title" className="field" name="title" />
						<input ref="calendarTimeInput" placeholder="time (hh:mm)" className="field" name="time" />
						{errorContent}
						<div className="btn-group">
							<input type="submit" value="submit" className="btn"></input>
						</div>

					</form>
				</div>
			</div>
		)
	}

}