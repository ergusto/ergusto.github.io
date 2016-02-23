import _ from 'lodash';
import Tools from '../lib/tools.js';

export default class TabbedStateBehaviour {

	constructor(component, defaultTab) {
		this.component = component;
		this.defaultTab = defaultTab;
		this.stateName = 'ERGUSTOtabName' + this.component.name + ':' + Tools.generateID();
	}

	init() {
		this.set(this.stateName, this.defaultTab);
	}

	get(property) {
		return this.component.state[property];
	}

	set(property, value) {
		let set = {};
		set = _.extend(set, this.component.state);
		set[property] = value;
		this.component.setState(set);
	}

	get current() {
		return this.get(this.stateName);
	}

	isCurrent(name) {
		return this.current == name;
	}

}