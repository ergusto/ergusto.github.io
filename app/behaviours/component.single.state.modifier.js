import { generateID }from '../lib/tools.js';

export default class ComponentSingleStateModifierBehaviour {

	// must be called from constructor of react component

	constructor(component, defaultState) {
		this.component = component;
		this.stateName = 'ergusto:state-modifier:' + generateID();
		this.defaultState = defaultState;
		this.component.state[this.stateName] = this.defaultState;
	}

	set(value) {
		const set = {};
		set[this.stateName] = value;
		this.component.setState(set);
	}

	get current() {
		return this.component.state[this.stateName];
	}

	isCurrent(value) {
		return this.current == value;
	}

	clear() {
		this.set(null);
	}

}