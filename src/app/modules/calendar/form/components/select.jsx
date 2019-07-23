import React, { useState, useRef, useEffect } from 'react';
import posed, { PoseGroup } from 'react-pose';

import './select.scss';

const ItemsContainer = posed.div({
	enter: { opacity: 1  },
	exit: { opacity: 0 }
});

const SelectItems = ({
	items,
	currentValue,
	onItemSelect,
	select
}) => {
	const listEl = useRef(null);
	const activeItemEl = useRef(null);

	useEffect(() => {
		if(listEl.current && activeItemEl.current) {
			const topPosition = activeItemEl.current.offsetTop;
			listEl.current.scrollTop = (topPosition - 20);
		}
	});

	return (
		<ul ref={listEl} className='select-list absolute background-color-white box-shadow-large border-radius-large'>
			{items.map(item => {
				const isActiveEl = item === currentValue;
				const className = `select-item block background-color-white color-muted-grey font-weight-medium cursor-pointer ${isActiveEl ? 'select-item--active' : ''}`
				return (
					<li key={item} onClick={() => onItemSelect(item)} ref={isActiveEl ? activeItemEl : null} className={className}>
						{item}
					</li>
				);
			})}
		</ul>
	);
};

const SelectComponent = ({
	field,
	className,
	items = [],
	form: { touched, errors, values, setFieldValue },
	onItemSelect,
	...props
}) => {
	const containerEl = useRef(null);

	const [showItems, setShowItems] = useState(false);

	const documentClick = event => {
		if(!containerEl.current.contains(event.target)) {
			setShowItems(false);
			document.body.removeEventListener('click', documentClick);
		}
	};

	const onValueClick = () => {
		setShowItems(true);
		document.body.addEventListener('click', documentClick);
	};

	const selectItem = value => {
		onItemSelect(value);
		setFieldValue(field.name, value);
		setShowItems(false);
	};

	return (
		<div ref={containerEl} className='select-field inline-block'>
			<input type='text' className='select-input select-field__input display-none' />
			<div onClick={onValueClick} className='select-value color-muted-grey font-weight-medium cursor-pointer inline-block'>
				{values[field.name]}
			</div>
			<PoseGroup flipMove={false}>
				{showItems ? (
					<ItemsContainer key='items-container'>
						<SelectItems onItemSelect={selectItem} currentValue={values[field.name]} items={items} /> 
					</ItemsContainer>
				) : null}
			</PoseGroup>
		</div>
	);
};

export default SelectComponent;
