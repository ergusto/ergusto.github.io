import React from 'react';
import FormStateBehaviour from '../../behaviours/form.js';

// import styles for this component
require('!style!css!sass!./styles/detail.scss');

export default class CalendarDetailComponent extends React.Component {

	constructor() {
		super();
		this.state = {};
	 	this.form = new FormStateBehaviour(this);
		const day = this.props.day;
	 	this.entry = this.props.diary.getItemFromDateIdentifier(day.identifier);
	}

	showCalendarHandler(event) {
		event.preventDefault();
		this.props.showCalendar();
	}

	submitHandler(event) {
		event.preventDefault();
		const titleValue = this.refs.calendarTitleInput.value;
		const descriptionValue = this.refs.calendarDescriptionInput.value;
		const entry = this.entry || this.props.diary.shell();
		const entryEvent = {};

		if (!titleValue) {
			this.form.addError('please enter a title');
			return;
		}

		entryEvent.title = titleValue;
		entryEvent.description = descriptionValue;

		entry.entries.push(entryEvent);

		if (entry.id) {
			this.props.diary.update(entry);
		} else {
			this.props.diary.create(entry);
		}

		this.form.clearError();
		this.refs.calendarTitleInput.value = '';
		this.refs.calendarDescriptionInput.value = '';
	}

	generateEntryHTML() {
		return (
			<li></li>
		)
	}

	render() {
		const err = this.form.error;
		const day = this.props.day;
		let errContent;
		let entryHTML;
	 	console.log(this.entry);

		if (this.entry) {
			entryHTML = this.generateEntryHTML();
		}

		if (err) {
			errContent = (<span className="form-error">{err}</span>);
		}

		return (
			<div className="calendar-detail">
				<header className="calendar-detail-header padding box">
					<h2>{day.date} {day.month} {day.year}</h2>
				</header>

				<div className="calendar-subheader box">
					<a className="btn btn-large" href="#" onClick={this.showCalendarHandler.bind(this)}>back</a>
				</div>

				<div className="calendar-body box padding">
					<div className="">
						<h3>events:</h3>
					</div>
					{entryHTML}
					<form onSubmit={this.submitHandler.bind(this)}>

						<input ref="calendarTitleInput" placeholder="title" className="field" name="title" />
						{errContent}
						<textarea ref="calendarDescriptionInput" placeholder="description" className="field" name="text"></textarea>
						<div className="btn-group">
							<input type="submit" value="submit" className="btn"></input>
						</div>

					</form>
				</div>
			</div>
		)
	}

}