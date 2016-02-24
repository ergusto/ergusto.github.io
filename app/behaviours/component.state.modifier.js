import _ from 'lodash';
import Tools from '../lib/tools.js';

export default class ComponentStateModifierBehaviour {

	constructor(component, defaultState) {
		this.component = component;
		this.defaultState = defaultState;
		this.stateName = 'ERGUSTO:state-modifier:' + Tools.generateID() + ':';
		this.usedStateNames = [];

		_.each(defaultState, (property, value) => {
			const state = {};
			state.property = property;
			state.value = value;
			property = this.getStateNameForProperty(property);
			this.component.state[property] = state;
		});
	}

	getStateNameForProperty(property) {
		const stateName = this.stateName + property;
		if (this.usedStateNames.indexOf(stateName) >= 0) {
			this.usedStateNames.push(stateName);
		}
		return stateName;
	}

	clear(property) {
		if (property) {
			const set = {};
			set[property] = undefined;
			this.setState(set);
		} else {
			const set = {};
			this.usedStateNames.forEach((usedName) => {
				set[usedName] = undefined;
			});
			this.setState(set);
		}
	}

	get(property) {
		if (!!property && _.isString(property)) {
			property = this.getStateNameForProperty(property);
			return this.component.state[property];
		} else {
			return this.usedStateNames.map((usedName) => {
				return this.component.state[usedName];
			});
		}
	}

	set(property, value) {
		let set = {};
		if (_.isObject(property)) {
			const state = property;
			_.each(state, (property, value) => {
				const _set = {};
				_set.property = property;
				_set.value = value;
				property = this.getStateNameForProperty(property);
				set[property] = _set;
			});
		} else {
			property = this.getStateNameForProperty(property);
			set[property] = value;
		}
		this.component.setState(set);
	}

}