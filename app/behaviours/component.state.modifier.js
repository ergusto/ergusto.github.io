import Tools from '../lib/tools.js';

export default class ComponentSingleStateModifierBehaviour {

	constructor(component, defaultState) {
		this.component = component;
		this.stateName = 'ERGUSTO:state-modifier:' + this.component.name + ':' + Tools.generateID();
		this.defaultState = defaultState;
	}

	get(property) {
		return this.component.state[property];
	}

	set(value) {
		const set = {};
		set[this.stateName] = value;
		this.component.setState(set);
	}

	init() {
		this.set(this.defaultState);
	}

	get current() {
		return this.get(this.stateName);
	}

	isCurrent(value) {
		return this.current == value;
	}

}