import React from 'react';
import classnames from 'classnames';
import { getHourDigit } from 'app/lib';
import EntryItem from '../entry-item/entry-item.jsx';

import './hour-item.scss';

const clickEventType = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';

const parentContainerClass = '.day-detail';

export default function HourItem({ hour, entries, setHour, hoveredHour, setHoveredHour, unsetHoveredHour, clearSelection, startHour, endHour }) {
	const documentClick = event => {
		if(!endHour && !event.target.closest(parentContainerClass)) {
			clearSelection();	
			document.removeEventListener(clickEventType, documentClick);
		}
	};

	const itemClickHandler = event => {
		if(!startHour && !endHour) {
			document.addEventListener(clickEventType, documentClick);
		}
		setHour(hour);
	};

	const onMouseOverHandler = event => {
		if(startHour && !endHour) {
			setHoveredHour(hour);
		}
	};

	const onMouseOutHandler = event => {
		unsetHoveredHour(hour);
	};

	let className = 'calendar-hour padding-horizontal border-radius-large border-bottom clearfix border-color-light-grey background-color-light-grey--on-hover cursor-pointer no-outline relative';

	const hourDigit = getHourDigit(hour),
		startDigit = startHour ? getHourDigit(startHour) : null,
		endDigit = endHour ? getHourDigit(endHour) : null,
		hoveredDigit = hoveredHour ? getHourDigit(hoveredHour) : null,

		hasSelectedStartHour = !!startHour,
		hasSelectedEndHour = !!endHour,
		hasHoveredHour = !!hoveredHour,

		isSelectingForwards = (((hasSelectedStartHour && (hasHoveredHour || hasSelectedEndHour)) && (hoveredDigit >= startDigit)) || ((hasSelectedStartHour && hasSelectedEndHour) && startDigit < endDigit)),
		isSelectingBackwards = (((hasSelectedStartHour && (hasHoveredHour || hasSelectedEndHour)) && (hoveredDigit <= startDigit)) || ((hasSelectedStartHour && hasSelectedEndHour) && startDigit > endDigit)),

		isStartHour = isSelectingForwards ? hourDigit === startDigit : hourDigit === hoveredDigit,
		isEndHour = isSelectingForwards ? hourDigit === endDigit : hourDigit === startDigit,
		isHoveredHour = hourDigit === hoveredDigit;

	let isSelected, isSelectedSingle, isSelectedStart, isSelectedEnd;

	if(hasSelectedStartHour && hasSelectedEndHour) {
		isSelected = (hourDigit >= startDigit && hourDigit <= endDigit);
		isSelectedSingle = hourDigit === startDigit && hourDigit === endDigit;
	} else if (hasSelectedStartHour && hasHoveredHour) {
		if(isSelectingForwards) {
			isSelected = (hourDigit >= startDigit && hourDigit <= hoveredDigit);
			isSelectedEnd = (hourDigit >= startDigit && hourDigit === hoveredDigit);
		} else if(isSelectingBackwards) {
			isSelected = (hourDigit <= startDigit && hourDigit >= hoveredDigit);
			isSelectedStart = (hourDigit <= startDigit && hourDigit === hoveredDigit);
		}
	} else if(hasSelectedStartHour && isHoveredHour) {
		// Selected start hour but no hour hovered
		isSelected = true;
		isSelectedSingle = true;
	}

	className = classnames(className, {
		'hour-selected': isSelected,
		'hour-hovered': isHoveredHour,
		'hour-selected-start': isStartHour || isSelectedStart,
		'hour-selected-end': isEndHour || isSelectedEnd,
		'hour-selected-single': isSelectedSingle
	});

	return (
		<li onMouseOver={onMouseOverHandler} onMouseOut={onMouseOutHandler} onClick={itemClickHandler} className={className}>
			<div className='padding-vertical float-left'>
				<p>{hour}</p>
			</div>
			{!!entries ? entries.length ? ( entries.map(entry => <EntryItem key={entry.dayIdentifier} entry={entry} />) ) : null : null }
		</li>
	);}
