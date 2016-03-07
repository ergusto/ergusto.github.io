import React from 'react';

import Tools from '../../lib/tools.js';

// import styles for this component
require('!style!css!sass!./styles/item.scss');

export default class CalendarItemComponent extends React.Component {

	setActiveDay(day, event) {
		event.preventDefault();
		this.props.setActiveDay(day);
	}

	render() {
		let entrylist;
		let classes = 'calendar-day muted padding-sm';
		const { day, diary } = this.props;
		const entry = diary.getItemFromDateIdentifier(day.identifier);

		if (day.isToday) {
			classes = classes + ' isToday';
		}
		
		if (entry && entry.identifier) {
			const sortedEntries = _.sortBy(entry.entries, 'time');
			const entryTextHtml = sortedEntries.map((entry, index) => {
				if (index <= 2) {
					return <li className="calendar-item-entry" key={'calendar-item-' + entry.time}><small>{Tools.truncate(entry.title, 17)}</small></li>;
				}
				if (index == 3) {
					return <li className="calendar-item-entry">...</li>;
				}
			});

			entrylist = <ul className="calendar-item-entry-list">{entryTextHtml}</ul>;
		}

		return (
			<li onClick={this.setActiveDay.bind(this, day)} className={classes}>
				<span className="calendar-item-date">{day.date}</span>
				{entrylist}
			</li>
		)
	}

}