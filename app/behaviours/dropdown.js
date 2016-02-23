import _ from 'lodash';
import Tools from '../lib/tools.js';

export default class DropDownBehaviour {

	constructor(component) {
		this.component = component;
		this.dropdownName = 'shouldShow:ERGUSTOdropdownName' + this.component.name + ':' + Tools.generateID();
	}

	init() {
		this.set(false);
	}

	get() {
		return this.component.state[this.dropdownName];
	}

	set(value) {
		let set = {};
		set = _.extend(set, this.component.state);
		set[this.dropdownName] = value;
		this.component.setState(set);
	}

	current() {
		return this.component.state[this.dropdownName];
	}

	open() {
		this.set(true);
	}

	close() {
		this.set(false);
	}

	toggle() {
		this.set(!this.current());
	}

	isOpen() {
		return !!this.current();
	}

	isClosed() {
		return !this.current();
	}


}