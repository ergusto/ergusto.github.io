import Tools from '../lib/tools.js';

export default class ComponentSingleStateModifierBehaviour {

	// must be called from constructor of react component

	constructor(component, defaultState) {
		this.component = component;
		this.stateName = 'ERGUSTO:state-modifier:' + this.component.name + ':' + Tools.generateID();
		this.defaultState = defaultState;
		if (!component.state) {
			component.state = {};
		}
		this.component.state[this.stateName] = this.defaultState;
	}

	get(property) {
		return this.component.state[property];
	}

	set(value) {
		const set = {};
		set[this.stateName] = value;
		this.component.setState(set);
	}

	get current() {
		return this.get(this.stateName);
	}

	isCurrent(value) {
		return this.current == value;
	}

}