import React from 'react';
import { generateID } from '../../lib/tools.js';

const topMostClassText = 'calendar-hour-event-topmost';
const hoverableClassText = 'hover-cursor--pointer';

export default class CalendarEventComponent extends React.Component {

	constructor() {
		super();
	}

	onClickHandler(event) {
		event.stopPropagation();
		const topMostEvent = document.querySelector('.' + topMostClassText);
		if (topMostEvent) {
			topMostEvent.classList.remove(topMostClassText);
			topMostEvent.classList.add(hoverableClassText);
		}
		this.refs.listitem.classList.remove(hoverableClassText);
		this.refs.listitem.classList.add(topMostClassText);
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

	render() {
		const { event, currentStartHour, currentEndHour, entriesLength } = this.props;
		let className = "calendar-hour-event box-shadow hover-cursor--default";

		if (entriesLength > 1) {
			if (entriesLength == 2) className += ' calendar-hour-event-double';
			if (entriesLength == 3) className += ' calendar-hour-event-triple';
			if (entriesLength > 3) className += ' calendar-hour-event-multiple';
		}

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
			<li ref="listitem" onClick={this.onClickHandler.bind(this)} style={style} className={className}>
				<a onClick={this.removeEventHandler.bind(this, event)} href="#" className="pull-right remove-event">&#10799;</a>
				{event.title}
			</li>
		);
	}

}